const { MongoClient } = require("mongodb");
require('dotenv').config();


let client;
let db;

module.exports = {
    async conectDB(endPoint){
        if(!client){
            client = await MongoClient.connect(process.env.URL);
        }
        db = client.db(endPoint);
        return db
    },
    getDB(){
        return db
    }
}
