const socket = io();

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    
    e.preventDefault()

    //formo el producto con los valores de index.html

    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        thumbnail: formAgregarProducto[2].value
    }

    //envio el producto

    socket.emit('update', producto);

    //limpio los contenidos de producto

    formAgregarProducto.reset()

})

socket.on('productos', manejarEventoProductos);

async function manejarEventoProductos(productos){
    //busca plantilla
    const recursoRemoto = await fetch('plantillas/tabla-productos.hbs')

    //extraigo el texto de la respuesta
    const textoPlantilla = await recursoRemoto.text()

    //armado de templade hbs
    const functionTemplate = Handlebars.compile(textoPlantilla)

    //rellenando plantilla
    const html = functionTemplate({ productos })

    //reemplazando contenido del navegador por nuevo contenido
    document.getElementById('productos').innerHTML = html 
}

//parte de codigo de mensajes

function mostrarMensajes(mensajes){
    const mensajesParaMostrar = mensajes.map(({fecha, autor, texto}) =>{
        return `<span style="color:blue;"><b>${autor}</b></span> <span style="color:brown;">[${fecha}]:</span> <span style="color:green;"><i>${texto}</i></span>`
    })
    
    const mensajesHtml = `${mensajesParaMostrar.join('<br>')}`

    const listaMensajes = document.getElementById('listaMensajes')
    listaMensajes.innerHTML = mensajesHtml
}

socket.on('mensajesActualizados', mensajes =>{
    mostrarMensajes(mensajes)
})

const botonEnviar = document.getElementById('botonEnviar')
botonEnviar.addEventListener('click', e => {
    const inputAutor = document.getElementById('inputAutor')
    const inputMensaje = document.getElementById('inputMensaje')
    if (inputAutor.value && inputMensaje.value) {
        const mensaje = {
            autor: inputAutor.value,
            texto: inputMensaje.value
        }
        socket.emit('nuevoMensaje', mensaje)
    } else {
        alert('ingrese algun mensaje')
    }
})
