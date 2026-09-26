const { HomeController } = require("./home");
const { CatalogController } = require('./Catalog');
const { market } = require("./shop");
const { productController } = require("./Product");
const { wishController } = require("./wishList");
const { cartController } = require("./cart");

module.exports = {  
    HomeController,
    CatalogController,
    market,
    productController,
    wishController,
    cartController
}