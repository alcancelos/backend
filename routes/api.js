const app = require('../app');
var express = require('express');
var router = express.Router();
var novedadesModel=require('./../models/novedadesModel');
var cloudinary = require('cloudinary').v2;
var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));


router.get('/novedades', async function(req,res,next){
    let novedades=await novedadesModel.getNovedades();
    novedades= novedades.map(novedad=>{
        if(novedad.img_id){
            const imagen=cloudinary.url(novedad.img_id,{
                width:100,
                height:100,
                crop:'fill'
            });
            return {
                ...novedad,
                imagen
            }
        }else{
            return{
                ...novedad,
                imagen:''
            }
        }
    });
    res.json(novedades);
});

module.exports=router;