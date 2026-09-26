const { ObjectId } = require("mongodb");
const { conectDB, getDB } = require("../../DB");
const { Config } = require("../config");

class HomeService extends Config {

    async filrtBrand(category){
        await conectDB('Shop')
        const db = getDB();

        const brand = await db.collection(category).find().toArray()

        return new Set(brand.map(el => el.brand))
    }

    async renderShop(category){
        const shopDate = await this.#shopDate(category);
        const user = await this.#userdate();

        const shop = shopDate.map(el => {
            if(user && user.whishList && user.whishList.some(itm => itm.id.toString() === el._id.toString())){
                return {...el, favorit : true}
            }else{
                return {...el, favorit : false}
            }
        });

        return shop
    }

    async #userdate(userId = 1){
        await conectDB('usersDB')
        const db = getDB();


        return await db.collection('users').findOne({id : userId})
    }

    async #shopDate(category){
        await conectDB('Shop')
        const db = getDB();

        return  await db.collection(category).find().toArray()

    }
}

module.exports.HomeService = HomeService