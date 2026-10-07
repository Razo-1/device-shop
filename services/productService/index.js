const { Config } = require('../config')
const { ObjectId } = require("mongodb");
const { conectDB, getDB } = require("../../DB");

class ProductService extends Config {

    async #gadgetPrice(id,count,catalog){    
        try{
            await conectDB('Shop')
            const db = getDB();

            const device = await db.collection(catalog).findOne(
                {
                    _id : new ObjectId(id)
                }
            )

            if(!device){
                return false
            }

            const fullPrice = Math.floor(device.price / 362) * count
                        
            return { fullPrice,img : device.image }

        }catch(error){
            console.log(error)
        }

    }

    async #userBalance(sessionId){
        try{
            await conectDB('usersDB')
            const db = getDB();

            const user = await db.collection('users').findOne(
                {
                    _id : new ObjectId(sessionId)
                }
            )

            if(!user){
                return false
            }

            return user.balance

        }catch(error){
            console.log(error)
            return false
        }
    }

    async #buyDevice(sessionId, price, catalog, count, id, img){
        try{
            await conectDB('usersDB')
            const db = getDB();

            const date = new Date().toISOString().split('T')[0];

            const transaction = {
                date,
                type: 'purchase',
                title: catalog,
                count,
                amount: price,
                id,
                img
            }

            const user = await db.collection('users').updateOne(
                {
                    _id: new ObjectId(sessionId)
                },
                {
                    $inc: {
                        balance: -price,
                        totalSpent : price
                    },
                    $push: {
                        transactions: transaction
                    },
                }
            )

            if(user.matchedCount === 0){
                return false
            }

            return true

        }catch(error){
            console.log(error);
            return false;
        }
    }

    async #incDevice(catalog,count,id){
        try{
            await conectDB('Shop')
            const db = getDB();

            const device = await db.collection(catalog).updateOne(
                {
                    _id : new ObjectId(id)
                },
                {
                    $inc : { inStock : -count }
                }
            )

            if(device.matchedCount === 0){
                return false
            }
            

            return true

        }catch(error){
            console.log(error);
            return false;
        }
    }

    async buyProduct(res,{id,count,catalog},sessionId){
        try{
           const {fullPrice,img} =  await this.#gadgetPrice(id,count,catalog);
           const userBalance = await this.#userBalance(sessionId)

           if(fullPrice && userBalance && userBalance >= fullPrice){

                const buyDevice = await this.#buyDevice(sessionId,fullPrice,catalog,count,id,img);
                const incDevice = await this.#incDevice(catalog,count,id);

                if(buyDevice && incDevice){
                    res.status(200).json({msg : 'It was successfully arranged and purchased.',ok : true})
                }else{
                    res.status(401).json({msg : 'An error occurred.',ok : false})
                }
           }else{
                res.status(400).json({
                msg: 'Insufficient balance or product not found.',
                ok: false
                });
            }
        }catch(error){
            console.log(error)
        }
    }
}

module.exports.ProductService = ProductService