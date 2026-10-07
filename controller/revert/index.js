class Revert {
    async returnDevice(req,res,next){
        try{
            const { sessionId } =  req.user;
            const { id,count,title } = req.body

            await req.app.locals.services.revert.returnDevice(res,sessionId,id,count,title)
        }catch(error){
            console.log(error);
            res.status(500).json({msg: error.message, ok: false})
        }
    }
}

module.exports.revertController = new Revert();