class Home {

    async renderHome(req,res,next){
        const path = req.app.locals.services.home.createPath('index');
        return res.render(path)
    }

    async renderShop(req,res,next){

        const { endpoint } = req.params
        const path = req.app.locals.services.home.createPath('shop');
        const category = await req.app.locals.services.home.filrtBrand(endpoint);
        const shop = await req.app.locals.services.home.renderShop(endpoint);        
        return res.render(path,{shop,category})
    }

    
}

module.exports.HomeController = new Home()