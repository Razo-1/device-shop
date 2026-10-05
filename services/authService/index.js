require('dotenv').config();
const { ObjectId } = require('mongodb');
const { conectDB, getDB } = require('../../DB');
const { Config } = require('../config');
const jwt = require('jsonwebtoken');

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

    #createAccessToken(sessionId){
        return jwt.sign(
            {sessionId},
            process.env.PRIVATE_KEY,
            {algorithm : 'RS256',expiresIn : '15m'}
        );
    }

    #createRefreshToken(sessionId){
        return jwt.sign(
            {sessionId},
            process.env.PRIVATE_KEY,
            {algorithm : 'RS256',expiresIn : '7d'}
        );
    }

    

    createToken(res,sessionId){
        res.cookie('accessToken',this.#createAccessToken(sessionId),{
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken',this.#createRefreshToken(sessionId),{
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
    }

    async refreshAccessToken(token){
    try{
        const decoded = this.verifyRefreshToken(token);
        
        const newAccessToken = this.#createAccessToken(decoded.sessionId);
        
        return newAccessToken;
    }catch(error){
        console.log(error);
        throw new Error('Invalid refresh token');
    }
}
}

module.exports.AuthService = AuthService