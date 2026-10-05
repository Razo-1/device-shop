const { AuthService } = require("./authService");
const { CartService } = require("./cartSerive");
const { HomeService } = require("./homeService");
const { ProductService } = require("./productService");
const { ProfileService } = require("./profileService");
const { ShopService } = require("./shopService");
const { WishService } = require("./wishService");

module.exports = {
    HomeService,
    ShopService,
    ProductService,
    WishService,
    CartService,
    AuthService,
    ProfileService,
}