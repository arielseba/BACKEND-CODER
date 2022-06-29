
const express = require('express')
const Contenedor = require('./Contenedor')

//Funcion que devuelve un numero aleatorio entre dos numeros
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}


const app = express()

const PORT = process.env.PORT || 8080

const archivo = new Contenedor('productos.txt')
archivo.init()

//Conexion al server
const server = app.listen(PORT, () => {
    console.log(`Server listening [${PORT}]...`)
})

app.get('/productos', (request, response) => {
    response.send(  archivo.getAll())
})

app.get('/productosRandom', (request, response) => {
       response.send(  archivo.getById(random(1,3)))
    
})

server.on('error', (e) => console.log('Error on server', e))



    
