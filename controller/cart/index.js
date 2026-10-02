class Cart {
    async renderCart(req,res,next){

        const { sessionId } = req.cookies;

        const path = req.app.locals.services.cart.createPath('cart');
        const cartDate = await req.app.locals.services.cart.renderCart(sessionId);
        
        res.render(path,{cartDate})
    }

    async clearAll(req,res,next){

        const { sessionId } = req.cookies;

        return await req.app.locals.services.cart.deleteAllRes(res,sessionId);
    }

    async deleteOne(req,res,next){
        const { id } = req.body
        const { sessionId } = req.cookies;
        
        return await req.app.locals.services.cart.deleteOneRes(id,res,sessionId);
    }
}

module.exports.cartController = new Cart()