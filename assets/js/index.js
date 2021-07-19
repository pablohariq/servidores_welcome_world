const http = require('http');
const fs = require('fs');
const url = require('url')
const moment = require('moment')

//crear archivo
// const crearArchivo = (nombreArchivo, contenido) => {
//     fs.writeFile(nombreArchivo, contenido, () => console.log("hola"))
// }



http
.createServer((req, res) => {
    //disponibilizar url
    const params = url.parse(req.url, true).query
    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'}) //el head de la respuesta del servidor estará en UTF-8
    
    if (req.url.includes("/crear")){
        const nombreArchivo = params.archivo;
        const contenidoIngresado = params.contenido
        const fechaCreacion = moment().format("DD/MM/YYYY")
        console.log(fechaCreacion)
        const contenidoArchivo = `${fechaCreacion}\n${contenidoIngresado}`

        fs.writeFile(nombreArchivo, contenidoArchivo, 'utf8', () => console.log("Archivo creado con éxito"))
        res.end(`Archivo creado con éxito!`)
    }
    if (req.url.includes("/leer")){
        const nombreArchivo = params.archivo;
        fs.readFile(nombreArchivo,'utf-8',(err, contenido) => {
            res.write(contenido)
            res.end()
        })
    }
    if (req.url.includes("/renombrar")){
        const nombreActual = params.nombre;
        const nuevoNombre = params.nuevoNombre;
        fs.rename(nombreActual, nuevoNombre, () => {
            res.end(`Archivo ${nombreActual} renombrado a ${nuevoNombre} con éxito.`)
        })
    }
    if (req.url.includes("/eliminar")){
        const nombreArchivo = params.archivo;
        res.write(`<p>Solicitud de eliminación del archivo '${nombreArchivo}' en proceso...<p>`, () => {
            setTimeout(() => {
                fs.unlink(nombreArchivo, () => {
                    res.end(`<p>Archivo '${nombreArchivo}' eliminado correctamente! <p>`)
                })
            },3000)
        })


    }

})
.listen(8080, () => console.log("Servidor corriendo en puerto 8080..."))