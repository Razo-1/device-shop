const express = require('express');
const profileRouter = express.Router();
const { profileController } = require('../../controller');
const { authStack,checkPassword,deposit,upload,removeAvatar } = require('../../middleware');

profileRouter.patch('/change-password',authStack,checkPassword,profileController.changePassword);
profileRouter.patch('/deposit',authStack,deposit,profileController.addFunds);
profileRouter.patch('/avatar',authStack,upload.single('avatar'),profileController.editAvatar)
profileRouter.delete('/remove-avatar',authStack,removeAvatar,profileController.deleteAvatar)


module.exports = { profileRouter }