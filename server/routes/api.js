//Importar modulos 
var express = requi('express');
var router = express.Router();

var mongoose = requise('mongoose');
mongoose.connect("mongodb://localhost/vinos");

var vinosSchema = { nombre: String, uva: String, descripcion: String};

//inicializar el modelo en la db
var Vinos = mongoose.model('vinos', vinosSchema);
//Definir las rutas
router.get('/',obtenerTodos);
router.get('/:id', obtenerEspecifico);
router.post('/',agregarVino);
router.put('/:id', actualizarId);
router.delete('/:id', borrarId);

function obtenerTodos(req, res, next)
{
    Vinos.find(function( error, vinos )
    {
        res.send(vinos);
    });
}

function obtenerId( req, res, next)
{
    Vinos.findOne( {"_id" : req.params.id } , function( error, vinos)
    {
        res.send(vinos);
    }
    );
}

function agregarVino( req, res, next )
{
    var infoOrdenada = {
        nombre: req.body.nombre,
        uva: req.body.uva,
        descripcion: req.body.descripcion
    };

    var nuevoVino = new Vinos(infoOrdenada);

    nuevoVino.save( function( error )
    {
        if( error )
        {
            res.send(500);
        }else{
            res.send( JSON.stringify( infoOrdenada ) );
        }
    });
}

function actualizarId( req, res, next )
    {
        var infoActualizada =
        {
            nombre: req.body.nombre,
            uva: req.body.uva,
            descripcion: req.body.descripcion
        };
        Vinos.update( { "_id" : req.params.id }, infoActualizada, function ( error )
        {
            if( error )
            {
                res.send(500);
            }else{
                res.send( JSON.stringify( infoOrdenada ) );
            }
        });
    }

function borrarId( req, res , next )
{
    
        Vinos.remove( { "_id" : req.params.id }, infoActualizada, function ( error )
        {
            if( error )
            {
                res.send(500);
            }else{
                res.send( JSON.stringify( infoOrdenada ) );
            }
        });
}

module.exports = router;
