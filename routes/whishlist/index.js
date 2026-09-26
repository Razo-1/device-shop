const express = require('express');
const { wishController } = require('../../controller');
const wishlistRouter = express.Router();

wishlistRouter.get('/wishlist',wishController.wishRender)
wishlistRouter.delete('/wishlist/clear-all',wishController.clearAll)

module.exports = { wishlistRouter }
