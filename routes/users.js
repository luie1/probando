const express=require('express');
const router=express.Router();
const Users=require('../database/models/usuarios');

router.get('/',function(req,res,next){
    Users.find().exec().then(documentos=>{
        if(documentos.length==0){
          res.json({
            message:"no hay elementos en la base de datos"
          });
        }else{
          console.log(documentos);
          res.json(documentos);
        }
    }).catch(error=>{
        res.json({
          message:error
        });
    });
});

router.post('/',function(req,res,next){
    console.log(req.body);
    var nuevoUser={
      nombre:req.body.nombre,
      edad:req.body.edad
    }
    var nuevo=new Users(nuevoUser);
    nuevo.save().then(()=>{
      res.json({
        message:"usuario insertado"
      });
    }).catch(error=>{
      res.status(500).json({
         error:error
      });
    });
});

module.exports=router;
