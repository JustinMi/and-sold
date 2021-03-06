// middleware
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var flash = require('connect-flash');
var passport = require('passport');
var mongoose = require('mongoose'); 
var session = require('express-session');

// routes
var index = require('./routes/index');
var users = require('./routes/users');

// server setup
var configDB = require('./config/database.js');

// create Express app instance
var app = express();

// connect to server
var connection = mongoose.connect('mongodb://localhost/and-sold');

// views engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// pass passport for configuration
require('./config/passport')(passport); 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// direct initial route paths
app.use('/users', users);
index(app, passport, connection);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(3000, function (req, res) {
  console.log("listening on port 3000");
});

console.log(app);

module.exports = app;
exports.mongoose = mongoose;
