const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {insertarUsuario} = require('./consultas')


//
app.listen("3000", () => console.log('Puerto 3000 encendido'))

app.use(express.static("public"))
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"))
/* app.use("/css", express.static(__dirname + "/css")) */
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
//rutas
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/home.html")
})
app.get("/registro", (req, res) => {
    res.sendFile(__dirname + "/registro.html")
})
//ruta de registro de un usuario a la base de datos
app.post("/usuario", async (req, res) => {
    console.log("body",req.body)
    let {
        email,
        password,
        nombre,
        apellido
    } = req.body
    
    try {
        const result = await insertarUsuario(email, password, nombre, apellido)
        console.log("index.js",email,password,nombre,apellido)
        res.status(200).send(__dirname+"/index.html")
    } catch (error) {
        res.status(500).send({
            error: `Algo salio mal ... ${error}`,
            code: 500

        })
    }

})