const express = require('express');
const shopRouter = express.Router();
const { market } = require('../../controller');
const { alreadyExists } = require('../../middleware');

shopRouter.post('/filter/:endPoint',market.filter)
shopRouter.post('/wishlist',market.whishlist)
shopRouter.post('/cart',alreadyExists,market.addToCart)
shopRouter.get('/search',market.findDevice)
shopRouter.get('/product',market.renderProduct)

module.exports = { shopRouter }