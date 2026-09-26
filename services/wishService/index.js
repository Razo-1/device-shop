const { ObjectId } = require("mongodb");
const { conectDB, getDB } = require("../../DB");
const { Config } = require("../config");

class WishService extends Config {

    async getWishList() {
        try {
            await conectDB('usersDB');
            const db = getDB();
            const user = await db.collection('users').findOne({ id: 1 });

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


    async clearAllList(){
        
        try{
            await conectDB('usersDB');
            const db = getDB();

            const hasItems = await this.#isEmpty()

            if(hasItems){
                await db.collection('users').updateOne(
                {
                    id : 1
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

    async #isEmpty(){
        await conectDB('usersDB');
        const db = getDB();

        const user = await db.collection('users').findOne({id : 1})
        return user && user.whishList && user.whishList.length > 0
    }
}

module.exports.WishService = WishService;