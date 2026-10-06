const multer = require('multer');
const path = require('path')
const fs = require('fs').promises

const updateFile = async () => {
    try{
        const files = await fs.readdir(path.join(__dirname,'..','..','upload'));

        if (files.length > 0) {
            await fs.unlink(path.join(path.join(__dirname,'..','..','upload'), files[0]));
        }
    }catch(error){
        console.log(error);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        updateFile()
        cb(null, path.join(__dirname,'..','..','upload'));
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

module.exports = { upload };