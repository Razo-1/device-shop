const multer = require('multer');
const path = require('path')
const fs = require('fs').promises

const folder = path.join(__dirname,'..','..','upload');

const types = {
    'image/jpeg' : '.jpg',
    'image/png' : '.png',
    'image/webp' : '.webp'
};

const updateFile = async (sessionId,newFile) => {
    try{
        const files = await fs.readdir(folder);

        for(const file of files){
            if(file.startsWith(sessionId) && file !== newFile){
                await fs.unlink(path.join(folder, file));
            }
        }
    }catch(error){
        console.log(error);
    }
}

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        await fs.mkdir(folder,{ recursive : true });
        cb(null, folder);
    },

    filename: (req, file, cb) => {
        cb(null, req.user.sessionId + '-' + Date.now() + types[file.mimetype]);
    }
});

const multerUpload = multer({
    storage,
    limits : { fileSize : 2 * 1024 * 1024 },
    fileFilter : (req, file, cb) => {
        if(!types[file.mimetype]){
            return cb(new Error('Only JPG, PNG and WEBP images are allowed'));
        }
        cb(null, true);
    }
});

const upload = (req, res, next) => {
    multerUpload.single('avatar')(req, res, async (error) => {
        if(error){
            const msg = error.code === 'LIMIT_FILE_SIZE' ? 'The image must be smaller than 2 MB' : error.message;
            return res.status(400).json({msg, ok : false});
        }

        if(!req.file){
            return res.status(400).json({msg : 'Image is missing', ok : false});
        }

        await updateFile(req.user.sessionId, req.file.filename);
        next();
    });
}

module.exports = { upload };
