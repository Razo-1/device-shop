class Home {

    async renderHome(req,res,next){
        const path = req.app.locals.services.home.createPath('index');
        return res.render(path)
    }

    async renderShop(req,res,next){

        const { endpoint } = req.params
        const { sessionId } = req.user;

        const path = req.app.locals.services.home.createPath('shop');
        const category = await req.app.locals.services.home.filrtBrand(endpoint);
        const shop = await req.app.locals.services.home.renderShop(endpoint,sessionId);        
        return res.render(path,{shop,category})
    }

    toLogin(req,res,next){
        res.redirect('/auth/sign-in');
    }

    async renderProfile(req,res,next){
        try{
            const { sessionId } = req.user;

            const path = req.app.locals.services.home.createPath('profile');
            const user = await req.app.locals.services.home.renderUserDate(sessionId);

            return res.render(path , {profile : user});
        }catch(error){
            console.log(error);
            res.status(500).json({msg: error.message, ok: false});
        }
    }
}

module.exports.HomeController = new Home()