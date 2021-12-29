var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
    var conocido = Boolean(req.session.nombre);


    res.render('admin/login', {
        layout: 'admin/layout',
        conocido: conocido,
        nombre: req.session.nombre

    }

    );


});

module.exports = router;
