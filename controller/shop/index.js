class Shop {
    async filter(req,res,next){
        const { endPoint } = req.params
        const fillter = await req.app.locals.services.shop.filtring(endPoint,req.body)
        
        res.json(fillter)
    }

    async whishlist(req,res,next){
        const list = await req.app.locals.services.shop.addToWhishList(req.body);        
        return req.app.locals.services.shop.listRes(res,list)
    }

    async addToCart(req, res, next){
        const cart = await req.app.locals.services.shop.addNewDevice(req.body);
        return req.app.locals.services.shop.cartRes(res,cart)
    }

    async findDevice(req,res,next){
        const find = await req.app.locals.services.shop.searchDevice(req.query);
        return res.status(200).json({find, ok : true})
    }

    async renderProduct(req,res,next){
        const path =  req.app.locals.services.shop.createPath('product');
        const product = await req.app.locals.services.shop.renderDevice(req.query);
        
        return res.render(path,{product})
    }
}

module.exports.market = new Shop()