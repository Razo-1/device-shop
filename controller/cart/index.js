class Cart {
    async renderCart(req,res,next){
        const path = req.app.locals.services.cart.createPath('cart');
        const cartDate = await req.app.locals.services.cart.renderCart();
        
        res.render(path,{cartDate})
    }

    async clearAll(req,res,next){
        return await req.app.locals.services.cart.deleteAllRes(res);
    }

    async deleteOne(req,res,next){
        const { id } = req.body
        console.log(id);
        
        return await req.app.locals.services.cart.deleteOneRes(id,res);
    }
}

module.exports.cartController = new Cart()