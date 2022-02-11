const app = require('../app');



var express = require('express');
var router = express.Router();
var novedadesModel=require('./../models/novedadesModel');

router.get('/novedades', async function(req,res,next){
    let novedades=await novedadesModel.getNovedades();
    res.json(novedades);
});

module.exports=router;