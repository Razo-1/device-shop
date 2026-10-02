class AuthController {
    async renderLogin(req,res,next){
        const path = req.app.locals.services.auth.createPath('login');
        res.render(path)
    }

    async renderRegister(req,res,next){
        const path = req.app.locals.services.auth.createPath('register');
        res.render(path)
    }

    async createUser(req,res,next){
        try{        
            const user = await req.app.locals.services.auth.createUser(req.body);
            
            res.cookie('sessionId',user.sessionId);

            res.status(201).json({msg : 'user profile has been created!', ok : user.ok});
        }catch(error){
            console.log(error);
        }
    }

    async loginUser(req,res,next){
        try{
            const user = await req.app.locals.services.auth.loginUser(req.body);
            console.log(user);
            
            if(req.body.remember){
                res.cookie('sessionId',user.sessionId,{maxAge : 24 * 60 * 60 * 1000});
            }else{
                res.cookie('sessionId',user.sessionId);
            }

            res.status(200).json({msg : 'user profil found!', ok : user.ok});
        }catch(error){
            console.log(error);
        }
    }
}

module.exports.authController = new AuthController();