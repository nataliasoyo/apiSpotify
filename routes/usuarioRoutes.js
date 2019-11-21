'use strict'
var app = require('express')
var usuarioController = require('../controllers/usuarioController')

var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir : './upload/usuario'
    });

var api = app.Router()

api.post('/cargar-imagen-usuario/:id',
md_upload,usuarioController.cargarImagenUsuario);
api.get('obtener-imagen-usuario/:imagefile', md_upload,usuarioController.obtenerImagenUsuario);

api.post('/usuario-login', usuarioController.obtenerUsuario)
api.post('/usuario', usuarioController.crearUsuario)
api.put('/usuario/:id', usuarioController.actualizarUsuario)
api.delete('/usuario/:id', usuarioController.eliminarUsuario)

module.exports = api;