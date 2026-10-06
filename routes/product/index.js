const express = require('express');
const productRouter = express.Router();
const {  productController } = require('../../controller');
const { authStack } = require('../../middleware');

productRouter.patch('/buy-gadget',authStack,productController.buyDevice)

module.exports = { productRouter }