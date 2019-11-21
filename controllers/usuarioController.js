'use strict'

/* Para trabajar con ficheros deben agragarce: */
var fs = require('fs');
var path = require('path');


var Usuario = require('../models/usuarioModel')

function crearUsuario(req, res){
    var usuario = new Usuario()
    var params = req.body

    usuario.nombre = params.nombre
    usuario.edad = params.edad
    usuario.correo = params.correo
    usuario.password = params.password
    usuario.imagen = params.imagen
    usuario.role = params.role

    usuario.save().then((usuarioGuardado)=>{
       if(!usuarioGuardado){
           res.status(404).send({mesagge: 'No se ha registrado el usuario'})
       } else{
           res.status(200).send({usuario:usuarioGuardado});
       }
    }).catch(error=>{
        res.status(500).send({message:'Error al guardar el usuario'})
    })
}

function actualizarUsuario(req,res){
    var idUsuario = req.params.id
    var nuevosDatos = req.body

    Usuario.findByIdAndUpdate(idUsuario, nuevosDatos).exec().then((usuarioActualizado)=>{
        if(!usuarioActualizado){
            res.status(404).send({mesagge: 'No se ha actualizado el usuario'})
        } else{
            res.status(200).send({usuario:usuarioActualizado});
        }
     }).catch(error=>{
         res.status(500).send({message:'Error al actualizar el usuario'})
     })
 }

function obtenerUsuario(req,res){
    var params = req.body;
    var correo = params.correo;
    var password = params.password;
    Usuario.findOne({correo:correo.toLowerCase()}, 
    (err,usuario)=>{
        if(err){
            res.status(500).send({
                mesagge:"Error en el servidor"
            })
        }else{
            if(!usuario){
                res.status(200).send({
                    message:"No existe un usuario con ese nombre"
                })
            }else{
                if(usuario.password != password){
                    res.status(200).send({
                        message:"Contraseña errada"
                    })
                }else{
                    res.status(200).send({
                        usuario:usuario
                    })
                }
            }
        }
    } )
}

 function eliminarUsuario(req,res){
    var idUsuario = req.params.id
   
    Usuario.findByIdAndRemove(idUsuario).exec().then((usuarioEliminado)=>{
        if(!usuarioEleminado){
            res.status(404).send({mesagge: 'No se ha eliminado el usuario'})
        } else{
            res.status(200).send({usuario:usuarioEliminado});
        }
     }).catch(error=>{
         res.status(500).send({message:'Error al aliminar el usuario'})
     })
 }

 function cargarImagenUsuario(req,res){
    var idUsuario = req.params.id;
    var file_name = 'No subido...';

    //se valida si viene el archivo con la variable superglobal files
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        //se obtiene nombre del archivo
        var file_name = file_split[2];

        //se obtiene extension fichero
        var exp_split = file_name.split('\.');
        var file_ext = exp_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            Usuario.findByIdAndUpdate(idUsuario,{imagen:file_name},(err,usuarioActualizado)=>{
                if(err){
                    res.status(500).send({message:'Error en el servidor'});
                }else{
                    if(!usuarioActualizado){
                        res.status(404).send({message:'No se ha podido actualizar el usuario'});
                    }else{
                        //devuelve usuario antes de actualizarse
                        usuarioActualizado.imagen = file_name;
                        res.status(200).send({usuario:usuarioActualizado});
                    }
                }
            });
        }else{
            res.status(200).send({message:"Extension del archivo no correcta"});    
        }
    }else{
        res.status(200).send({message:"no ha subido ninguna imagen"});
    }
}

 function obtenerImagenUsuario(req,res){
     /* nombre fichero */
     var imageFile = req.params.imageFile;
     //ruta archivo
     var path_file = './upload/usuario/'+imageFile;
     //se comprueba si existe
     fs.exists(path_file,function(exists){
         if(exists){
             //devolvemos la imagen
             res.sendFile(path.resolve(path_file));
         }else{
             res.status(200).send(
                 {message:"No existe la imagen"});
         }
     });
 }

 module.exports = {
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    obtenerUsuario,
    cargarImagenUsuario,
    obtenerImagenUsuario,
}