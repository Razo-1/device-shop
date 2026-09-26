class Wish {
    
    async wishRender(req, res, next) {
        try {
            const viewPath = req.app.locals.services.wish.createPath('whishlist');
            const wishlist = await req.app.locals.services.wish.getWishList();
            
            res.render(viewPath, { wishlist });
        } catch (error) {
            next(error);
        }
    }

    async clearAll(req,res,next) {
        const del = await req.app.locals.services.wish.clearAllList();
        res.json({msg : 'the date has been delete',ok : del})
    }
}

module.exports.wishController = new Wish()