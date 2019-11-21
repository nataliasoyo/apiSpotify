'use strict'

var  mongoose = require('mongoose')
var app = require('./app')
var port = 3977

mongoose.connect('mongodb://localhost:27017/bitmusic',(error, res)=>{
    if(error){
        console.log("No se pudo conectar")
    }else{
        console.log("Conexión exitosa a base de datos")
        //.listen() es la forma de inicializar el servidor
        app.listen(port, ()=>{
            console.log("Api escuchando en el puerto " + port)
        })
    }
})