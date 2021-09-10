const express=require('express')
const app=express()


//
app.listen("3000",()=>console.log('Puerto 3000 encendido'))

app.use(express.static("public"))
app.use("/css",express.static(__dirname+"/node_modules/bootstrap/dist/css"))
/* app.use("/css", express.static(__dirname + "/css")) */

//rutas
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/home.html")
})
app.get("/registro",(req,res)=>{
    res.sendFile(__dirname+"/registro.html")
})