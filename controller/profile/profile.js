class Profile {
    async changePassword(req,res,next){
        try{
            const { newPass } = req.body;
            const { sessionId } =  req.user;

            await req.app.locals.services.profile.editPassword(res,newPass,sessionId)
        }catch(error){
            console.log(error);
            res.status(500).json({msg: error.message, ok: false})
        }
    }

    async addFunds(req,res,next){
        try{
            const { sessionId } =  req.user;
            const { deposit } = req.body

            await req.app.locals.services.profile.addFunds(res,deposit,sessionId)
        }catch(error){
            console.log(error);
            res.status(500).json({msg: error.message, ok: false})
        }
    }

    async editAvatar(req,res,next){
        try{
            const { sessionId } =  req.user;

            await req.app.locals.services.profile.newAvatar(req,res,sessionId)
        }catch(error){
            console.log(error);
            res.status(500).json({msg: error.message, ok: false})
        }
    }

    async deleteAvatar(req,res,next){
        try{
            const { sessionId } =  req.user;
            await req.app.locals.services.profile.deleteAvatar(res,sessionId)
        }catch(error){
            console.log(error);
            res.status(500).json({msg: error.message, ok: false})
        }
    }
}

module.exports.profileController = new Profile();