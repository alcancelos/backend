var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('admin/novedades', {
        layout: 'admin/layout',
        nombre: req.session.nombre,
        apellido: req.session.apellido,
        isNovedades: true
    });
});

module.exports = router;
