const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { catalogRouter } = require('./routes/catalog');
const { shopRouter } = require('./routes/shop');
const { productRouter } = require('./routes/product');
const { wishlistRouter } = require('./routes/whishlist');
const { cartRouter } = require('./routes/cart');
const { authRouter } = require('./routes/auth');
const { profileRouter } = require('./routes/profile');
const { revertRouter } = require('./routes/revert');

const { HomeService,ShopService,ProductService,WishService,CartService,AuthService,ProfileService,ReverService } = require('./services');

const app = express();


app.locals.services = {
  home : new HomeService(),
  shop : new ShopService(),
  gadget : new ProductService(),
  wish: new WishService(),
  cart : new CartService(),
  auth : new AuthService(),
  profile : new ProfileService(),
  revert : new ReverService(),
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', express.static(path.join(__dirname, 'upload')));


app.use('/', indexRouter);
app.use('/start',catalogRouter)
app.use('/users', usersRouter);
app.use('/device',shopRouter);
app.use('/product',productRouter);
app.use('/user',wishlistRouter);
app.use('/user',cartRouter);
app.use('/auth',authRouter);
app.use('/profile',profileRouter);
app.use('/return-device',revertRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
