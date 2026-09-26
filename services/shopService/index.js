const { ObjectId } = require("mongodb");
const { conectDB, getDB } = require("../../DB");
const { Config } = require("../config");

class ShopService extends Config {

    async filtring(endPoint, { minPrice, maxPrice, brand, inStock, isNew, rating }){
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
        const userProduct = await this.#userProduct()

        return products.map(el => ({
            ...el,
            favorit: !!(userProduct && userProduct.whishList && userProduct.whishList.some(itm => itm.id.toString() === el._id.toString()))
        }))
    }

    async addToWhishList({category, id}){
        try{
            await this.#updateUser(category, id);
            const bool = await this.#userDevice(id);
            return bool ? true : false
        }catch(error){
            console.log(error)
        }


    }

    async #updateUser(category, id){
        await conectDB('usersDB');
        const db = getDB();

        const bool = await this.#userDevice(id);

        if(bool){
            return await db.collection('users').updateOne(
                {id : 1},
                {$pull : { whishList : { id : new ObjectId(id) } } } 
            )
        }

        return await db.collection('users').updateOne(
            {id : 1},
            {$push : { whishList : {category : category,id: new ObjectId(id)} } }
        )
    }

    async #userDevice(id){
        await conectDB('usersDB');
        const db = getDB();

        const bool = await db.collection('users').findOne(
            {
                id : 1,
                "whishList.id" : new ObjectId(id)
            }
        )

        return bool ? true : false
    }


    async addNewDevice({category, id}){

        try{
            await conectDB('usersDB');
            const db = getDB();

            await db.collection('users').updateOne(
                {
                    id : 1,
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


    async searchDevice({catalog,item}){
        await conectDB('Shop');
        const db = getDB();

        const products = await db.collection(catalog).find({title : {
            $regex : item,
            $options : "i",
        }}).toArray()

        const userProduct = await this.#userProduct()

        return products.map(el => ({
            ...el,
            favorit: !!(userProduct && userProduct.whishList && userProduct.whishList.some(itm => itm.id.toString() === el._id.toString()))
        }))
    }

    async renderDevice({type,detail}){
        const product = await this.#shopProd(type,detail);
        const userProduct = await this.#userProduct()

        if(product && userProduct && userProduct.whishList && userProduct.whishList.some(el => el.id.toString() === product._id.toString())){
            product.favorit = true
            return product
        }
        
        if (product) {
            product.favorit = false
        }
        return product
    }

    async #userProduct(){
        try{
            await conectDB('usersDB');
            const db = getDB();

            return await db.collection('users').findOne({id : 1})
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