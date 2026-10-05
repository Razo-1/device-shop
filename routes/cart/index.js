const express = require('express');
const { cartController } = require('../../controller');
const cartRouter = express.Router();
const { authStack } = require('../../middleware');


cartRouter.get('/cart',authStack,cartController.renderCart)
cartRouter.delete('/cart/clear-all',authStack,cartController.clearAll)
cartRouter.delete('/cart/delete',authStack,cartController.deleteOne)


module.exports = { cartRouter }