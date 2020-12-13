var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var expenseRouter = require('./routes/expense');


var app = express();
// var port = 3000;
//mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://alim:alim@cluster0.o21xl.mongodb.net/personalBudgetApp?retryWrites=true&w=majority',{ useNewUrlParser: true,
useUnifiedTopology: true, useFindAndModify: false, useCreateIndex:true});
// cors
var cors = require('cors');
app.use(cors({
  origin:'http://localhost:4200'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/expense', expenseRouter);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control_Allow-Headers",
    "Origin,X-Requested-With, Content_Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  next();
});
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
// app.listen(port, () => {
//   console.log(`app listening at http://localhost:${port}`)
// });

module.exports = app;

