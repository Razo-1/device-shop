const { ObjectId } = require('mongodb');
const { conectDB, getDB } = require('../../DB')
const { Config } = require('../config')

class CartService extends Config {

    async renderCart(){
        return await this.#cartDate()
    }

    async #cartDate(){
        const user = await this.renderUserDate();

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

    async #deleteAll(){
        
        try{
            await conectDB('usersDB')
            const db = getDB();

            await db.collection('users').updateOne(
                {id : 1},
                {$set : {cart : []}}
            )

            return true
        }catch(error){
            console.log(error);
            return false
        }  

    }


   async deleteAllRes(res){
        const del = await this.#deleteAll()
        
        if(del){
            res.status(200).json({msg : "The trash has been emptied.", ok : true})
        }else{
            res.status(500).json({error : "An error occurred.", ok : false})
        }
   } 


   async #deleteOne(id){
        try{
            await conectDB('usersDB')
            const db = getDB();

            await db.collection('users').updateOne(
                {id : 1},
                {$pull : {cart : {id :new ObjectId(id)}}}
            )

            return true
        }catch(error){
            console.log(error);
            return false 
        }
   }

   async deleteOneRes(id,res){
        try {
            const del = await this.#deleteOne(id);

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