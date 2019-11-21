'use strict'

//llamado de los modulos a utilizar
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var usuariosRoutes = require('./routes/usuarioRoutes')
/* var rutasCancion = require('./routes/cancionRoutes');
var rutasCancion = require('./routes/usuarioRoutes'); */
//especificar el tipo de datos que se aceptaran en mi api
app.use(bodyParser.urlencoded({extenden:false}));
app.use(bodyParser.json())
// ruta a la colección
app.use('/api', usuariosRoutes)
/* app.use('/api', cancionRoutes) */

module.exports = app
