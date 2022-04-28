const express = require('express')
const fs = require('fs')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productos = []
const mensajes = []

//configuracion de socket

io.on('connection', socket =>{
    //parte productos
    socket.emit('productos', productos)

    socket.on('update', producto => {
        productos.push(producto)
        io.sockets.emit('productos', productos)
    })

    //parte mensajes
    socket.emit('mensajesActualizados', mensajes )

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fecha = new Date().toLocaleString()
        mensajes.push(mensaje)
        await fs.promises.writeFile('mensajes.txt', JSON.stringify(mensajes), 'utf-8')
        io.sockets.emit('mensajesActualizados', mensajes)
    })

});

//--------------------------------------------------------


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//iniciacion de servidor

const PORT = 8080
const conexionServidor = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
conexionServidor.on('error', error => console.log(error))