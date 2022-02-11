var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var pool = require('./models/bd');

var cors = require('cors');

//uso la session
const session = require('express-session');

var fileupload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');

var errorRouter = require('./routes/admin/error');
var novedadesRouter = require('./routes/admin/novedades');
var apiRouter = require('./routes/api');
var app = express();

secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configuro la clave secreta
app.use(session({
  secret: 'asdyjfghchmytcghm6i5',
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/error', errorRouter);
app.use('/admin/novedades', secured, novedadesRouter);

app.use('/api', cors(), apiRouter);
//Cierra la sesion, borra las variables de sesion y redirecciona al login
//donde muestra la pantalla para iniciar sesion
app.get('/salir', function (req, res) {
  req.session.destroy();
  res.redirect('/admin/login');
})

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
  res.render('error');
});

module.exports = app;
