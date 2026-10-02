const express = require('express');
const authRouter = express.Router();
const { authController } = require('../../controller')

authRouter.get('/sign-in',authController.renderLogin)
authRouter.get('/sign-up',authController.renderRegister)
authRouter.post('/register',authController.createUser)
authRouter.post('/login',authController.loginUser)


module.exports = { authRouter }