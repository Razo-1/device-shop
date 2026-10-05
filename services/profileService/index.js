const { ObjectId } = require('mongodb');
const { conectDB, getDB } = require('../../DB')
const { Config } = require('../config')

class ProfileService extends Config {
    async #changePassword(newPass,sessionId){
        try{
            await conectDB('usersDB');
            const db = getDB();

            const resulte = await db.collection('users').updateOne(
                {_id : new ObjectId(sessionId)},
                {$set : { "password" : newPass }}
            )

            if(resulte.matchedCount === 0){
                return false;
            }

            return true;

        }catch(error){
            console.log(error);
            return false
        }
    }

    async editPassword(res,newPass,sessionId){
        const result = await this.#changePassword(newPass,sessionId)

        if(result){
            res.status(200).json({msg : 'password has been changed!',ok : true})
        }else{
            res.status(401).json({msg : 'invlid password!',ok : false})
        }
    }


    async #editBalance(deposit,sessionId){
        try{
            await conectDB('usersDB');
            const db = getDB();

            const percentResult = deposit - (deposit * 0.3 / 100);

            const resulte = await db.collection('users').updateOne(
                {_id : new ObjectId(sessionId)},
                {$inc : { "balance" : percentResult }}
            )

            if(resulte.matchedCount === 0){
                return false;
            }

            return true;
        }catch(error){
            console.log(error);
            return false
        }
    }

    async addFunds(res,deposit,sessionId){

        const result = await this.#editBalance(deposit,sessionId)

        if(result){
            res.status(200).json({msg : 'password has been changed!',ok : true})
        }else{
            res.status(401).json({msg : 'invlid password!',ok : false})
        }
    }
}

module.exports.ProfileService = ProfileService