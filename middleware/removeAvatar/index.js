const path = require('path');
const fs = require('fs').promises;

const removeAvatar = async (req,res,next) => {
    try{
        const { sessionId } = req.user;
        const files = await fs.readdir(path.join(__dirname,'..','..','upload'));
        const file = files.find(el => el.startsWith(sessionId));

        if(file){
            await fs.unlink(path.join(__dirname,'..','..','upload',file));
        }else{
            return res.status(401).json({msg : 'Profile picture is missing. Nothing to delete.', ok : false})
        }
        next()
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

module.exports = { removeAvatar };