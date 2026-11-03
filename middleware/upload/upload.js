const multer = require('multer');
const path = require('path')
const fs = require('fs').promises

const folder = path.join(__dirname,'..','..','upload');

const updateFile = async (sessionId) => {
    try{
        const files = await fs.readdir(folder);
        const file = files.find(el => el.startsWith(sessionId));

        if (file) {
            await fs.unlink(path.join(folder, file));
        }
    }catch(error){
        console.log(error);
    }
}

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        await fs.mkdir(folder,{ recursive : true });
        await updateFile(req.user.sessionId)
        cb(null, folder);
    },

    filename: (req, file, cb) => {
        cb(null, req.user.sessionId + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

module.exports = { upload };
