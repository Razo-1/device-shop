const { ObjectId } = require('mongodb');
const { conectDB, getDB } = require('../../DB')
const { Config } = require('../config')

class CartService extends Config {

    async renderCart(sessionId){
        return await this.#cartDate(sessionId)
    }

    async #cartDate(sessionId){
        const user = await this.renderUserDate(sessionId);

        const categoryCache = new Map()

        return Promise.all(user.cart.map(async el => {
            
            if(!categoryCache.has(el.category)){
                let shopDate = await this.renderShopDate(el.category)
                categoryCache.set(el.category,shopDate)
            }

            let shopDate = categoryCache.get(el.category)
            return shopDate.find(itm => itm._id.toString() === el.id.toString())
        }))
    }

    async #deleteAll(sessionId){
        
        try{
            await conectDB('usersDB')
            const db = getDB();

            await db.collection('users').updateOne(
                {_id : new ObjectId(sessionId)},
                {$set : {cart : []}}
            )

            return true
        }catch(error){
            console.log(error);
            return false
        }  

    }


   async deleteAllRes(res,sessionId){
        const del = await this.#deleteAll(sessionId)
        
        if(del){
            res.status(200).json({msg : "The trash has been emptied.", ok : true})
        }else{
            res.status(500).json({error : "An error occurred.", ok : false})
        }
   } 


   async #deleteOne(id,sessionId){
        try{
            await conectDB('usersDB')
            const db = getDB();

            await db.collection('users').updateOne(
                {_id : new ObjectId(sessionId)},
                {$pull : {cart : {id :new ObjectId(id)}}}
            )

            return true
        }catch(error){
            console.log(error);
            return false 
        }
   }

   async deleteOneRes(id,res,sessionId){
        try {
            const del = await this.#deleteOne(id,sessionId);

            if (del) {
                res.status(200).json({ msg: "The device was removed", ok: true });
            } else {
                res.status(404).json({ error: "Device not found.", ok: false });
            }
        } catch(error) {
            console.log(error);
            res.status(500).json({ error: "An error occurred.", ok: false });
        }
   }

    async #getCartItems(user, counts){
        await conectDB('Shop');
        const db = getDB();

        const categoryCache = new Map();
        let totalPrice = 0;
        const items = [];

        for(const cartItem of user.cart){
            if(!categoryCache.has(cartItem.category)){
                const docs = await db.collection(cartItem.category).find().toArray();
                categoryCache.set(cartItem.category, docs);
            }

            const docs = categoryCache.get(cartItem.category);
            const product = docs.find(p => p._id.toString() === cartItem.id.toString());

            if(!product) return null;

            const countEntry = counts.find(c => c.id === cartItem.id.toString());
            const count = countEntry ? countEntry.count : 1;
            const itemPrice = Math.floor(product.price / 362) * count;
            totalPrice += itemPrice;
            items.push({ product, count, itemPrice, category: cartItem.category });
        }

        return { items, totalPrice };
    }

    async #purchase(sessionId, items, totalPrice){
        try{
            await conectDB('usersDB');
            const db = getDB();
            
            const date = new Date().toISOString().split('T')[0];
            const transactions = items.map(({ product, count, itemPrice, category }) => ({
                date,
                type: 'purchase',
                title: category || product.title  ,
                id : product._id.toString(),
                img : product.image,
                amount: itemPrice
            }));

            await db.collection('users').updateOne(
                { _id: new ObjectId(sessionId) },
                {
                    $inc: { balance: -totalPrice },
                    $push: { transactions: { $each: transactions } },
                    $set: { cart: [] },
                    $inc : { totalSpent : totalPrice}
                }
            );

            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    }

    async #decStock(items){
        try{
            await conectDB('Shop');
            const db = getDB();

            for(const { product, count, category } of items){
                await db.collection(category).updateOne(
                    { _id: product._id },
                    { $inc: { inStock: -count } }
                );
            }

            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    }

    async buyCart(res, sessionId, counts){
        try{
            const user = await this.renderUserDate(sessionId);

            if(!user || !user.cart || user.cart.length === 0){
                return res.status(400).json({ msg: 'Cart is empty.', ok: false });
            }

            const cartData = await this.#getCartItems(user, counts);

            if(!cartData){
                return res.status(404).json({ msg: 'Product not found.', ok: false });
            }

            const { items, totalPrice } = cartData;

            if(user.balance < totalPrice){
                return res.status(400).json({ msg: 'Insufficient balance.', ok: false });
            }

            const purchased = await this.#purchase(sessionId, items, totalPrice);
            const stocked = await this.#decStock(items);

            if(purchased && stocked){
                return res.status(200).json({ msg: 'Purchase successful! All items have been bought.', ok: true });
            }else{
                return res.status(401).json({ msg: 'An error occurred.', ok: false });
            }

        }catch(error){
            console.log(error);
            return res.status(500).json({ msg: 'An error occurred.', ok: false });
        }
    }

}

module.exports.CartService = CartService;