class Home {

    async renderHome(req,res,next){
        const path = req.app.locals.services.home.createPath('index');
        return res.render(path)
    }

    async renderShop(req,res,next){

        const { endpoint } = req.params

        const { sessionId } = req.cookies;

        const path = req.app.locals.services.home.createPath('shop');
        const category = await req.app.locals.services.home.filrtBrand(endpoint);
        const shop = await req.app.locals.services.home.renderShop(endpoint,sessionId);        
        return res.render(path,{shop,category})
    }

    toLogin(req,res,next){
        res.redirect('/auth/sign-in');
    }
}

module.exports.HomeController = new Home()