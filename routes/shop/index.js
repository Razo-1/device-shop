const express = require('express');
const shopRouter = express.Router();
const { market } = require('../../controller');
const { alreadyExists, authStack } = require('../../middleware');

shopRouter.post('/filter/:endPoint',authStack,market.filter)
shopRouter.post('/wishlist',authStack,market.whishlist)
shopRouter.post('/cart',authStack,alreadyExists,market.addToCart)
shopRouter.get('/search',authStack,market.findDevice)
shopRouter.get('/product',authStack,market.renderProduct)

module.exports = { shopRouter }