const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser');
const passport=require('passport');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//ดึง controller มาใช้
// var indexRouter = require('./routes/loginController');
const usersRouter = require('./routes/usersController');
const addcategoryRouter = require('./routes/addcategoryController');
const addproductRouter = require('./routes/addproductController');
const shop = require('./routes/shopController');

//กำหนดตัวแปรให้ controller
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addcategory', addcategoryRouter);
app.use('/addproduct', addproductRouter);
app.use('/shop', shop);

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(passport.initialize());
app.use(passport.session());


/*Filter Server and Require for Socket io*/
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, 'public')));


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
