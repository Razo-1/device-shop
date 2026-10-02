const { ObjectId } = require('mongodb');
const { conectDB, getDB } = require('../../DB');
const { Config } = require('../config');

class AuthService extends Config {
    async createUser(body){
        try{
            await conectDB('usersDB');
            const db = getDB();

            body.whishList = [];
            body.cart = [];
            

            const result = await db.collection('users').insertOne(body)

            if(result) return {ok : true, sessionId : result.insertedId};

            return false
        }catch(error){
            console.log(error);
            return error
        }
    }

    async loginUser(body){
        try{
            await conectDB('usersDB');
            const db = getDB();

            const result = await db.collection('users').findOne({"email" : body.email})

            if(result) return {ok : true , sessionId : result._id};
            
            return false
        }catch(error){
            console.log(error);
            return error
        }
    }

}

module.exports.AuthService = AuthService