const express = require('express');
const revertRouter = express.Router();
const { authStack } = require('../../middleware');
const { revertController } = require('../../controller');

revertRouter.put('/return',authStack,revertController.returnDevice);

module.exports = { revertRouter };