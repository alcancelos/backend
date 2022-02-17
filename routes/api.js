const app = require('../app');
var express = require('express');
var router = express.Router();
var novedadesModel=require('./../models/novedadesModel');
var cloudinary = require('cloudinary').v2;
var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
var nodemailer = require('nodemailer')

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

router.post('/contacto', async (req,res)=>{
    const mail={
        from: `${req.body.email}`,
        to: 'info@opjuridicocontable.com',
        subject: 'Contacto Web',
        html: `<h1>Nombre: ${req.body.name}</h1> 
        <h2>Email: ${req.body.email}</h2> 
        <h2>Motivo: ${req.body.subject}</h2>
        <h3>Mensaje:</h3> 
        <p>${req.body.message}</p>`
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transport.sendMail(mail)

    res.status(201).json({
        error: false,
        message:'Mensaje enviado'
    });
});

module.exports=router;