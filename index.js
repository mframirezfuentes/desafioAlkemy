const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {
    insertarUsuario,
    buscarUsuario,
    ingresoOperacion
} = require('./consultas')
const jwt = require('jsonwebtoken')
const secretKey = "Silencio"


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
app.post("/login", async (req, res) => {
    const {
        email,
        password
    } = req.body
    const user = await buscarUsuario(email, password)
    if (user.email) {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 180,
            data: user
        }, secretkey)
        res.send(token)
    } else {
        res.status(401).send({
            error: "Este usuario aún no ha sido verificado",
            code: 401
        })
    }

})
app.post("/autenticar", async (req, res) => {
    const {
        email,
        password
    } = req.body
    const user = await buscarUsuario(email, password)
    if (user.email) {

        const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 180,
                data: user
            },
            secretKey
        );
        res.send(token)

    } else {
        res.status(404).send({
            error: "Este usuario no esta registrado en la base de datos",
            code: 404
        })
    }
})
app.get("/datos", (req, res) => {
    const {
        token
    } = req.query
    jwt.verify(token, secretKey, (err, decode) => {
        const {
            data
        } = decode
        const {
            id,
            mail,
            nombre
        } = data
        err ?
            res.status(401).send(
                res.send({
                    error: `401 No Autorizado`,
                    message: `Usted no esta autorizado para estar en esta página`,
                    token_error: err.message
                })
            ) :
            res.sendFile(__dirname + `/datos.html`, {
                id,
                mail,
                nombre
            })
    })
})
//ruta de registro de un usuario a la base de datos
app.post("/usuario", async (req, res) => {
    let {
        email,
        password,
        nombre,
        apellido
    } = req.body

    try {
        const result = await insertarUsuario(email, password, nombre, apellido)
        res.status(200).sendFile(__dirname + "/home.html")
    } catch (error) {
        res.status(500).send({
            error: `Algo salio mal ... ${error}`,
            code: 500

        })
    }

})
app.post("/transaccion", (req, res) => {
                const {
                    token
                } = req.query
                jwt.verify(token, secretKey, async (err, decode) => {
                 
                    const {
                        mail,
                        monto,
                        tipo
                    } = data
                   
                    try {
                        const result = await ingresoOperacion(mail, monto, tipo)
                        res.status(200).sendFile(__dirname + "/datos.html")
                    } catch (error) {
                        res.status(500).send({
                            error: `Algo salio mal ... ${error}`,
                            code: 500

                        })
                    }

                })
            })


                app.get("*", (req, res) => {
                    res.send("Ruta invalida")
                })