const { AuthService } = require("./authService");
const { CartService } = require("./cartSerive");
const { HomeService } = require("./homeService");
const { ProductService } = require("./productService");
const { ProfileService } = require("./profileService");
const { ReverService } = require("./revertService");
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
    ReverService,
}