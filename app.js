var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var pool = require('./models/bd');


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

//Select
pool.query("select * from usuario").then(function (result) {
  console.log(result);
});

//insert

// var obj = {
//   nombre: 'Francisco',
//   apellido: "Cancelos",
//   email: 'francancelos@gmail.com',
//   logon: 'user',
//   password: 'user'
// }
// pool.query("insert into usuario set ?", [obj]).then(function (result) {
//   console.log(result);
// });

//update

// var id = 2;
// var obj = {
//   nombre: 'Pablo',
//   apellido: 'Rodriguez'
// }
// pool.query("update usuario set ?", [obj, id]).then(function (result) {
//   console.log(result);
// });

//borrar
// var id = 2;

// pool.query("delete from usuario where id_usuario= ?", [id]).then(function (result) {
//   console.log(result);
// });

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
  //Declaro una variable para saber cuando está logueado con exito
  logueado = false;
  //Recorro los usuarios y me fijo que coincida logon y contraseña
  usuarios.forEach(element => {
    if (element.logon == req.body.usuario && element.password == req.body.pass) {
      //si coincido guardo el nombre del usuario en la variable de sesion
      req.session.nombre = element.nombre;
      //cambio logueado a true
      logueado = true;
    }
  });
  //Si se logueó correctamente redirecciono a login, donde detecta que la variable de sesion nombre
  //tiene contenido y muestra un mensaje de bienvenida en vez del login
  if (logueado) {
    res.redirect('/admin/login')
  }
  //Caso contrario redirecciono a una pagina de error que me dice que el nombre de usuario
  //o contraseña están mal ingresados. 
  else {
    res.redirect('admin/error')
  }
});

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
