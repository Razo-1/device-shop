class Shop {
    async filter(req,res,next){

        const { sessionId } = req.cookies;

        const { endPoint } = req.params
        const fillter = await req.app.locals.services.shop.filtring(endPoint,sessionId,req.body)
        
        res.json(fillter)
    }

    async whishlist(req,res,next){

        const { sessionId } = req.cookies;
        const { category, id } = req.body

        const list = await req.app.locals.services.shop.addToWhishList(category, id,sessionId);        
        return req.app.locals.services.shop.listRes(res,list)
    }

    async addToCart(req, res, next){

        const { sessionId } = req.cookies;
        const { category, id } = req.body
 
        const cart = await req.app.locals.services.shop.addNewDevice(category, id,sessionId);

        return req.app.locals.services.shop.cartRes(res,cart)
    }

    async findDevice(req,res,next){

        const { catalog,item } = req.query;
        const { sessionId } = req.cookies;

        const find = await req.app.locals.services.shop.searchDevice(catalog,item,sessionId);
        return res.status(200).json({find, ok : true})
    }

    async renderProduct(req,res,next){

        const { sessionId } = req.cookies;
        const { type,detail } = req.query;

        const path =  req.app.locals.services.shop.createPath('product');
        const product = await req.app.locals.services.shop.renderDevice(type,detail,sessionId);
        
        return res.render(path,{product})
    }
}

module.exports.market = new Shop()