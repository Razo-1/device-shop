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
}

module.exports.CartService = CartService;