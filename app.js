var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/LoansCourse');
mongoose.connect('mongodb+srv://developer_habeeb:4AGuuAKvJBvPZ@cluster0.hlc4c.mongodb.net/loans-course?retryWrites=true&w=majority')
.then(()=>{
  console.log('Connected to database');
})
.catch((err)=>{
  console.log('Connection failed : '+err);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customersRouter = require('./routes/customers');
var paymentsRouter = require('./routes/payments');
var invoicesRouter = require('./routes/invoices');
var settingsRouter = require('./routes/settings');
var loansRouter = require('./routes/loans');
var loanTypesRouter = require('./routes/loan_types');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customers', customersRouter);
app.use('/users', usersRouter);
app.use('/payments', paymentsRouter);
app.use('/invoices', invoicesRouter);
app.use('/settings', settingsRouter);
app.use('/loans', loansRouter);
app.use('/loan_types', loanTypesRouter);

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
