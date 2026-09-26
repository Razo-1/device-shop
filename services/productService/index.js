const { Config } = require('../config')
const { ObjectId } = require("mongodb");
const { conectDB, getDB } = require("../../DB");

class ProductService extends Config {
    async buyGudged({id,count,catalog}){    
        try{
            await conectDB('Shop')
            const db = getDB();

            await db.collection(catalog).updateOne(
                {
                    _id : new ObjectId(id)
                },
                {
                    $inc : {inStock : -Number(count)}
                }
            )

            return true
        }catch(error){
            console.log(error)
        }

    }
}

module.exports.ProductService = ProductService