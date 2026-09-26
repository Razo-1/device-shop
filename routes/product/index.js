const express = require('express');
const productRouter = express.Router();
const {  productController } = require('../../controller');

productRouter.patch('/buy-gadget',productController.buyDevice)

module.exports = { productRouter }