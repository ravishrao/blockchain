// configire express project
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// initialize blockchain
var blockChain = require("./controllers/BlockChain.js");
blockChain.initializeChain();


// define API routes
var blockChainApiRoutes = require('./routes/blockChainApi.js');

// add routes to express
app.use('/block', blockChainApiRoutes);

// handle undefined routes
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

module.exports = app;