var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;

var routes = require('./routes/index');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
mongoClient.connect('mongodb://localhost:27017/test', function(err, db){
  app.set('mongodb', db);
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.post('/login', function(req, res, next){
  if (req.body.login === 'admin' && req.body.pass === 'Heckfy1978ycr!'){
    res.cookie('user', {
      user: 'p1yebcv3764cvb19348fyubgd48c7r9627rbc0cr87fg9n4cybgrq87vwavrtvycbfn4g7q8r7vbtcf9n67w4tvb6cfb9q',
      domain:'localhost',
      path:'/admin',
      secure: true,
      httpOnly: true,
      expires: 0
    });
    res.redirect('/admin');
  } else {
    res.render('login', {title: 'u r not auth!'});
  }
});

app.post('/get-company', function(req, res, next){
  if (req.body.company){
    req.app.get('mongodb').collection('company').findOne({name:req.body.company},function(err, company){
      if (err) next(new Error('not find'));
      else {
        if (company) res.render('admin', {title: 'express', toggle: false, company:company});
        else res.render('admin', {title: 'express', toggle: false});
      }
    });
  }
});
app.post('/upsert-company', function(req, res, next){
  if (req.body){
    var company = req.body;
    req.app.get('mongodb').collection('company').updateOne({name:company.name}, {$set: company}, {upsert:true}, function(err, r){
      if (err) next(new Error('cant save or update'));
      else res.redirect('/admin');
    });
  }
});
app.get('/logout', function(req, res, next){
  res.cookie('user', {
    user: 'not auth',
    domain:'localhost',
    path:'/admin',
    secure: true,
    httpOnly: true,
    expires: 1
  });
  res.redirect('/admin');
});
app.use('/admin', admin);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
