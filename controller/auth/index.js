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
            
            req.app.locals.services.auth.createToken(res,user.sessionId)

            res.status(201).json({msg : 'user profile has been created!', ok : user.ok});
        }catch(error){
            console.log(error);
            res.status(500).json({msg: error.message, ok: false})
        }
    }

    async loginUser(req,res,next){
        try{
            const { remember } = req.body

            const user = await req.app.locals.services.auth.loginUser(req.body);
            
            req.app.locals.services.auth.createToken(res,user.sessionId,remember)

            res.status(200).json({msg : 'user profil found!', ok : user.ok});
        }catch(error){
            console.log(error);
            res.status(500).json({msg: error.message, ok: false})
        }
    }

    logout(req,res,next){
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.json({msg : 'You have logged out of your profile' , ok : true})
    }


    async refreshToken(req,res,next){
        try{
            const refreshToken = req.cookies.refreshToken;

            if(!refreshToken) {
                throw new Error('Refresh token not found');
            }

            const newAccessToken = await req.app.locals.services.auth.refreshAccessToken(refreshToken);

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000
            });

            res.json({msg: 'Access token refreshed', ok: true});

        }catch(error){
            console.log(error);
            res.status(500).json({msg: error.message, ok: false})
        }
    }
}

module.exports.authController = new AuthController();