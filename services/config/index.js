const fs = require('fs').promises;
const path = require('path');
const { conectDB, getDB } = require('../../DB');

class Config {
    createPath(fileName){
        return path.join(__dirname,'..','..','views',`${fileName}.ejs`);
    }

    async readCategory(){
        try{
            const category =  JSON.parse(await fs.readFile(path.join(__dirname,'..','..','DB','category.json'),'utf-8'));
            return category
        }catch(error){
            console.log(error);
        }
    }

    async readShop(fileName){
        try{
            const shop =  JSON.parse(await fs.readFile(path.join(__dirname,'..','..','DB',`${fileName}.json`),'utf-8'));
            return shop
        }catch(error){
            console.log(error);
        }
    }

    async getDataBase(namefile,cole){
        await conectDB(namefile)
        const db = getDB()

        const shop = await db.collection(cole).find().toArray()
        return shop
    }

    async renderUserDate(){
        await conectDB('usersDB');
        const db = getDB()

        return await db.collection('users').findOne({id : 1})
    }

    async renderShopDate(category){
        await conectDB('Shop');
        const db = getDB()

        return await db.collection(category).find().toArray()
    }
}

module.exports.Config = Config;