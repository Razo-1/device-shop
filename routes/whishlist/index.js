const express = require('express');
const { wishController } = require('../../controller');
const wishlistRouter = express.Router();
const { authStack } = require('../../middleware');

wishlistRouter.get('/wishlist',authStack,wishController.wishRender)
wishlistRouter.delete('/wishlist/clear-all',authStack,wishController.clearAll)

module.exports = { wishlistRouter }
