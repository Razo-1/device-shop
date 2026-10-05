class Wish {
    
    async wishRender(req, res, next) {
        try {

            const { sessionId } = req.user;
            
            const viewPath = req.app.locals.services.wish.createPath('whishlist');
            const wishlist = await req.app.locals.services.wish.getWishList(sessionId);
            
            res.render(viewPath, { wishlist });
        } catch (error) {
            next(error);
        }
    }

    async clearAll(req,res,next) {

        const { sessionId } = req.user;

        const del = await req.app.locals.services.wish.clearAllList(sessionId);
        res.json({msg : 'the date has been delete',ok : del})
    }
}

module.exports.wishController = new Wish()