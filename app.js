var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { catalogRouter } = require('./routes/catalog');
const { shopRouter } = require('./routes/shop');
const { productRouter } = require('./routes/product');
const { wishlistRouter } = require('./routes/whishlist');
const { cartRouter } = require('./routes/cart');
const { authRouter } = require('./routes/auth');


const { HomeService,ShopService,ProductService,WishService,CartService,AuthService } = require('./services');

var app = express();


app.locals.services = {
  home : new HomeService(),
  shop : new ShopService(),
  gadget : new ProductService(),
  wish: new WishService(),
  cart : new CartService(),
  auth : new AuthService(),
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/start',catalogRouter)
app.use('/users', usersRouter);
app.use('/device',shopRouter);
app.use('/product',productRouter);
app.use('/user',wishlistRouter);
app.use('/user',cartRouter)
app.use('/auth',authRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
