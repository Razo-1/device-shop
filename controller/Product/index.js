class Product {
    async buyDevice(req,res,next){
        const buy = await req.app.locals.services.gadget.buyGudged(req.body);
        res.status(200).json({msg : "The purchase went smoothly" , ok : buy})
    }
}

module.exports.productController = new Product()