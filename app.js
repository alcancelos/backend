var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//uso la session
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var errorRouter = require('./routes/admin/error');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

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

app.post('/ingresar', function (req, res) {
  ///hago un arreglo de objetos de usuario solo para probar
  //Esto se supone que está en la BD
  var usuarios = [
    {
      nombre: 'Alejandro Martín Cancelos',
      logon: 'admin',
      password: 'admin'
    }, {
      nombre: 'Francisco Pablo Cancelos',
      logon: 'user',
      password: 'user'
    }
  ];
  logueado = false;
  usuarios.forEach(element => {
    if (element.logon == req.body.usuario && element.password == req.body.pass) {
      req.session.nombre = element.nombre;
      logueado = true;

    }
  });
  if (logueado) {
    res.redirect('/admin/login')
  } else {
    res.redirect('admin/error')
  }

});

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
