const express = require('express');
const profileRouter = express.Router();
const { profileController } = require('../../controller');
const { authStack,checkPassword,deposit } = require('../../middleware');

profileRouter.patch('/change-password',authStack,checkPassword,profileController.changePassword);
profileRouter.patch('/deposit',authStack,deposit,profileController.addFunds);


module.exports = { profileRouter }