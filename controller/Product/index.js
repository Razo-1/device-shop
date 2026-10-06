class Product {
    async buyDevice(req,res,next){

        const { sessionId } = req.user;

        await req.app.locals.services.gadget.buyProduct(res,req.body,sessionId);
    }
}

module.exports.productController = new Product()