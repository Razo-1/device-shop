const express = require('express');
const { cartController } = require('../../controller');
const cartRouter = express.Router();


cartRouter.get('/cart',cartController.renderCart)
cartRouter.delete('/cart/clear-all',cartController.clearAll)
cartRouter.delete('/cart/delete',cartController.deleteOne)


module.exports = { cartRouter }