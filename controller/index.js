const { HomeController } = require("./home");
const { CatalogController } = require('./Catalog');
const { market } = require("./shop");
const { productController } = require("./Product");
const { wishController } = require("./wishList");
const { cartController } = require("./cart");
const { authController } = require("./auth");
const { profileController } = require("./profile/profile");

module.exports = {  
    HomeController,
    CatalogController,
    market,
    productController,
    wishController,
    cartController,
    authController,
    profileController
}