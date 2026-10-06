const { ObjectId } = require("mongodb");
const { conectDB, getDB } = require("../../DB");
const { Config } = require("../config");

class ShopService extends Config {

    async filtring(endPoint,sessionId, { minPrice, maxPrice, brand, inStock, isNew, rating }){
        await conectDB('Shop')
        const db = getDB()
        
        const filter = {}
        minPrice && (filter.price = { $gte: minPrice })
        maxPrice && (filter.price = { ...filter.price, $lte: maxPrice })
        brand && (filter.brand = brand)
        inStock && (filter.inStock = inStock)
        isNew && (filter.isNew = isNew)
        rating && (filter.rating = { $gte: rating })
        
        const products = await db.collection(endPoint).find(filter).toArray()
        const userProduct = await this.#userProduct(sessionId)

        return products.map(el => ({
            ...el,
            favorit: !!(userProduct && userProduct.whishList && userProduct.whishList.some(itm => itm.id.toString() === el._id.toString()))
        }))
    }

    async addToWhishList(category, id,sessionId){
        try{
            await this.#updateUser(category, id,sessionId);
            const bool = await this.#userDevice(id,sessionId);
            return bool ? true : false
        }catch(error){
            console.log(error)
        }


    }

    async #updateUser(category, id,sessionId){
        await conectDB('usersDB');
        const db = getDB();

        const bool = await this.#userDevice(id,sessionId);

        if(bool){
            return await db.collection('users').updateOne(
                {_id : new ObjectId(sessionId)},
                {$pull : { whishList : { id : new ObjectId(id) } } } 
            )
        }

        return await db.collection('users').updateOne(
            {_id : new ObjectId(sessionId)},
            {$push : { whishList : {category : category,id: new ObjectId(id)} } }
        )
    }

    async #userDevice(id,sessionId){
        await conectDB('usersDB');
        const db = getDB();

        const bool = await db.collection('users').findOne(
            {
                _id : new ObjectId(sessionId),
                "whishList.id" : new ObjectId(id)
            }
        )

        return bool ? true : false
    }


    async addNewDevice(category, id,sessionId){

        try{
            await conectDB('usersDB');
            const db = getDB();

            await db.collection('users').updateOne(
                {
                    _id : new ObjectId(sessionId),
                },
                {
                    $push : { cart : { category : category,id: new ObjectId(id)} } 
                }
            )
            
            return true

        }catch(error){
            console.log(error);
            return false;
        }
        
    }

    listRes(res,bool){
    
        const msg = bool ? "The device has been successfully added" : "The item has been removed from the wish list";

        return res.status(bool ? 201 : 200).json({msg, ok : bool});
    }

    cartRes(res,bool){
        return res.status(201).json({msg : "The device has been successfully added" , ok : bool});
    }


    async searchDevice(catalog,item,sessionId){
        await conectDB('Shop');
        const db = getDB();

        const products = await db.collection(catalog).find({title : {
            $regex : item,
            $options : "i",
        }}).toArray()

        const userProduct = await this.#userProduct(sessionId)

        return products.map(el => ({
            ...el,
            favorit: !!(userProduct && userProduct.whishList && userProduct.whishList.some(itm => itm.id.toString() === el._id.toString()))
        }))
    }

    async renderDevice(type,detail,sessionId){
        const product = await this.#shopProd(type,detail);
        const userProduct = await this.#userProduct(sessionId)

        if(product){
            product.categorySlug = type;
        }

        if(product && userProduct && userProduct.whishList && userProduct.whishList.some(el => el.id.toString() === product._id.toString())){
            product.favorit = true
            return product
        }
        
        if (product) {
            product.favorit = false
        }
        return product
    }

    async #userProduct(sessionId){
        try{
            await conectDB('usersDB');
            const db = getDB();

            return await db.collection('users').findOne({_id : new ObjectId(sessionId)})
        }catch(error){
            console.log(error)
        }
    }

    async #shopProd(type,detail){
        try{
            await conectDB('Shop');
            const db = getDB();

            return await db.collection(type).findOne({_id : new ObjectId(detail)})
        }catch(error){
            console.log(error)
        }
    }
    
}



module.exports.ShopService = ShopService;