const { ObjectId } = require("mongodb");
const { conectDB, getDB } = require("../../DB");
const { Config } = require("../config");

class WishService extends Config {

    async getWishList(sessionId) {
        try {
            await conectDB('usersDB');
            const db = getDB();
            const user = await db.collection('users').findOne({ _id: new ObjectId(sessionId) });

            if (!user || !user.whishList || user.whishList.length === 0) {
                return [];
            }

            return await this.#giveDevice(user)
    
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    

    async #giveDevice(user){
        await conectDB('Shop');
            const shopDb = getDB();

            const products = await Promise.all(
                user.whishList.map(async (item) => {
                    try {
                        const product = await shopDb
                            .collection(item.category)
                            .findOne({ _id: new ObjectId(item.id) });

                        if (product) {
                            product.favorit = true;
                            product.categorySlug = item.category;
                        }
                        return product;
                    } catch (e) {
                        return null;
                    }
                })
            );

        return products.filter(Boolean);
    }


    async clearAllList(sessionId){
        
        try{
            await conectDB('usersDB');
            const db = getDB();

            const hasItems = await this.#isEmpty(sessionId)

            if(hasItems){
                await db.collection('users').updateOne(
                {
                    _id : new ObjectId(sessionId)
                },
                {
                    $set : {whishList : []}
                }
                )
                return true
            }else{
                return false
            }
            

        }catch(error){
            console.log(error)
        }
        
    }

    async #isEmpty(sessionId){
        await conectDB('usersDB');
        const db = getDB();

        const user = await db.collection('users').findOne({_id : new ObjectId(sessionId)})
        return user && user.whishList && user.whishList.length > 0
    }
}

module.exports.WishService = WishService;