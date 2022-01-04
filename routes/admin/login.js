var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;

        var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

        if (data != undefined) {
            //paso el id y el nompbre y el apellido del usuario
            req.session.id_usuario = data.id_usuario;
            req.session.nombre = data.nombre;
            req.session.apellido = data.apellido;
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
    }
})

/* GET users listing. */
router.get('/', function (req, res, next) {

    res.render('admin/login', {
        layout: 'admin/layout',
        nombre: req.session.nombre,
    }
    );
});

//uso el /salir del app.js pero lo dejo por las dudas
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

module.exports = router;
