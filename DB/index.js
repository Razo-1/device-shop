const { MongoClient } = require("mongodb");
require('dotenv').config();


let db;

module.exports = {
    async conectDB(endPoint){
        let url = process.env.URL + endPoint;
        const client = await MongoClient.connect(url);
        db = client.db();
        return db
    },
    getDB(){
        return db
    }
}