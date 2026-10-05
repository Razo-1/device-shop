const express = require('express');
const authRouter = express.Router();
const { authController } = require('../../controller')

authRouter.get('/sign-in',authController.renderLogin)
authRouter.get('/sign-up',authController.renderRegister)
authRouter.post('/register',authController.createUser)
authRouter.post('/login',authController.loginUser)
authRouter.post('/logout',authController.logout)
authRouter.post('/refresh-token',authController.refreshToken)


module.exports = { authRouter }