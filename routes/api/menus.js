var express = require('express');
var router = express.Router();
var multer=require('multer');
var path=require('path');
const fs = require('fs');


const Menu = require('../../database/models/menu');

/* GET Menue. */

const storage = multer.diskStorage({
    destination: function (res, file, cb) {
        try {
            fs.statSync('./public/uploads');
        } catch (e) {
            fs.mkdirSync('./public/uploads/');
        }
        cb(null, './public/uploads/');
    },
    filename: (res, file, cb) => {
        cb(null, 'IMG-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({storage: storage });

router.get('/', function (req, res, next) {

    Menu
        .find()
        .exec()
        .then(docs => {
            if (docs.length == 0) {
                res.json({
                    message: "No se encontro en la base de datos"
                })
            } else {
                res.json(docs);
            }
        }).catch(err => {
            res.json({
                error: err
            });
        })

});

router.post('/',upload.single('img'), function (req, res, next) {

    //console.log(req.body);


    //var ruta=rut.substring(6,rut.length);
    //console.log(ruta);
    const datos = {
        nombre: req.body.nombre,
        foto:"uploads/"+req.file["filename"],
        restaurant: req.body.restaurant,
        precio: req.body.precio
    };
    //console.log(datos);return;
    var modelMenu = new Menu(datos);
    modelMenu.save()
        .then(result => {
            res.json({
                message: "Menu insertado en la bd"
            })
        }).catch(err => {
          console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

router.patch('/:id', function (req, res, next) {
    let idMenu = req.params.id;
    const datos = {};

    Object.keys(req.body).forEach((key) => {
        datos[key] = req.body[key];
    });
    console.log(datos);
    Menu.findByIdAndUpdate(idMenu, datos).exec()
        .then(result => {
            res.json({
                message: "Datos actualizados"
            });
        }).catch(err => {
            res.status(500).json({
                error: err.message
            })
        });
});

router.delete('/:id', function (req, res, next) {
    let idMenu = req.params.id;

    Menu.findByIdAndRemove(idMenu).exec()
        .then(() => {
            res.json({
                message: "Menu eliminado"
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });


});

module.exports = router;
