const { ObjectId } = require('mongodb');
const { conectDB, getDB } = require('../../DB');
const { Config } = require('../config')

class ReverService extends Config {
    async returnDevice(res,sessionId,id,count,title){
        try{
            const shop = await this.#returnInTheShop(id,count,title);
            const updateTransactions = await this.#updateUserTransactions(sessionId,id)

            if(shop && updateTransactions){
                return res.status(200).json({msg : 'The item was returned.' , ok : true})
            }else{
                return res.status(401).json({msg : 'Product not found' , ok : false})
            }
        }catch(error){
            console.log(error);
            return res.status(500).json({msg : 'An error occurred; please try again later.' , ok : false})
        }
        
    }

    async #returnInTheShop(id,count,title){
        try{
            await conectDB('Shop');
            const db = getDB();

            const result = await db.collection(title).updateOne(
                {_id : new ObjectId(id)},
                {
                    $inc : { inStock : count }
                }
            )

            if(result.matchedCount === 0){
                return false;
            }

            return true
        }catch(error){
            console.log(error);
            return false
        }
    }

    async #updateUserTransactions(sessionId,id){
        try{
            await conectDB('usersDB');
            const db = getDB();

            const result = await db.collection('users').updateOne(
                { _id: new ObjectId(sessionId), "transactions.id": id },
                { $set: { "transactions.$.type": 'refund' } }
            )

            if(result.matchedCount === 0){
                return false;
            }

            return true
        }catch(error){
            console.log(error);
            return false
        }
    }
}

module.exports.ReverService = ReverService;