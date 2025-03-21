/* 
 * Larissa Rosenbrant
 */

var createError = require('http-errors');
var express = require('express');
const bodyParser = require("body-parser");
var path = require('path');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var indexRouter = require('./routes/index');
var displayRouter = require('./routes/display');
var addRouter = require('./routes/addcourse');
var updateRouter = require('./routes/update');
var deleteRouter = require('./routes/delete');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/favicon.ico', express.static('favicon.ico'));
app.use('/display', displayRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.use('/add', addRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error', {title: "Error", message: err.message});
});
module.exports = app;

