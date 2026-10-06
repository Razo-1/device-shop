class Cart {
    async renderCart(req,res,next){

        const { sessionId } = req.user;

        const path = req.app.locals.services.cart.createPath('cart');
        const cartDate = await req.app.locals.services.cart.renderCart(sessionId);
        
        res.render(path,{cartDate})
    }

    async clearAll(req,res,next){

        const { sessionId } = req.user;

        return await req.app.locals.services.cart.deleteAllRes(res,sessionId);
    }

    async deleteOne(req,res,next){
        
        const { id } = req.body
        const { sessionId } = req.user;
        
        return await req.app.locals.services.cart.deleteOneRes(id,res,sessionId);
    }

    async buyCart(req,res,next){

        const { sessionId } = req.user;
        const { counts } = req.body;

        return await req.app.locals.services.cart.buyCart(res,sessionId,counts);
    }
}

module.exports.cartController = new Cart()
