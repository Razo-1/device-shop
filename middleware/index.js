const { alreadyExists } = require('./alart');
const { authStack } = require('./authStack/authStack');
const { checkPassword } = require('./checkPassword/checkPassword');
const { deposit } = require('./deposit/deposrti');
const { removeAvatar } = require('./removeAvatar');
const { upload } = require('./upload/upload');
const { toHome } = require('./toHome')
module.exports = { alreadyExists,authStack,checkPassword,deposit,upload,removeAvatar,toHome };