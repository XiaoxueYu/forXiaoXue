//创建express模块
var express = require('express')
,path = require('path')
,favicon = require('serve-favicon')
,logger = require('morgan')
,cookieParser = require('cookie-parser')
, bodyParser = require('body-parser')
,fs = require('fs')

//以下是新加的
,session = require('express-session')
,MongoStore = require('connect-mongo')(session)
,settings = require('./settings')
,serveStatic = require('serve-static')
,flash = require('connect-flash');


var routes = require('./routes/index'),
    user = require('./routes/user'),
    meal = require('./routes/meal'),
    category = require('./routes/category'),
//    comment= require('./routes/comment'),   
    order = require('./routes/order')
var app = express();

var models_path = __dirname + '/models'
// var walk = function(path) {
//   fs
//     .readdirSync(path)
//     .forEach(function(file) {
//       var newPath = path + '/' + file
//       var stat = fs.statSync(newPath)

//       if (stat.isFile()) {
//         if (/(.*)\.(js|coffee)/.test(file)) {
//           require(newPath)
//         }
//       }
//       else if (stat.isDirectory()) {
//         walk(newPath)
//       }
//     })
// }
// walk(models_path)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//以下是新加的连接数据库
app.use(session({
  secret:settings.cookieSecret,
  store:new MongoStore({
    db:settings.db,
    url: 'mongodb://localhost:27017/graduate'
  })
}));

//以下和直接创建的代码不同
app.use(flash());
app.use('/public',express.static(path.join(__dirname, 'public')));
// app.use(serveStatic(path.join(__dirname, 'public')));
app.locals.moment = require('moment')
//Increasing routes
app.use('/',routes);
app.use('/',user);
app.use('/',meal);
app.use('/',category)
//app.use('/', comment)
app.use('/',order)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//以下是新加的
app.use(function(req, res, next){
  res.locals.user = req.session.user;
 // res.locals.post = req.session.post;
  var error = req.flash('error');
  res.locals.error = req.session? req.session.error : null
 
  var success = req.flash('success');
  res.locals.error = req.session? req.session.error : null
  next();
});


module.exports = app;
    