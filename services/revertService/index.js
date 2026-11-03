const { ObjectId } = require('mongodb');
const { conectDB, getDB } = require('../../DB');
const { Config } = require('../config')

class ReverService extends Config {
    async returnDevice(res,sessionId,id,count,title){
        try{
            const updateTransactions = await this.#updateUserTransactions(sessionId,id)

            if(!updateTransactions){
                return res.status(401).json({msg : 'Product not found' , ok : false})
            }

            const shop = await this.#returnInTheShop(id,updateTransactions.count,title);

            if(shop){
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

            const user = await db.collection('users').findOne(
                { _id: new ObjectId(sessionId), transactions : { $elemMatch : { id, type : 'purchase' } } }
            )

            if(!user){
                return false;
            }

            const transaction = user.transactions.find(el => el.id === id && el.type === 'purchase');

            await db.collection('users').updateOne(
                { _id: new ObjectId(sessionId), transactions : { $elemMatch : { id, type : 'purchase' } } },
                {
                    $set : { "transactions.$.type": 'refund' },
                    $inc : { balance : transaction.amount, totalSpent : -transaction.amount }
                }
            )

            return { count : transaction.count || 1 }
        }catch(error){
            console.log(error);
            return false
        }
    }
}

module.exports.ReverService = ReverService;