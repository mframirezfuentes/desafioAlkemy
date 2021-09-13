const {
    Pool
} = require('pg')
const pool = new Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'ahorro'
})

async function insertarUsuario(email, password, nombre, apellido) {
    const result = await pool.query(`INSERT INTO usuario(email,password, nombre,apellido) VALUES('${email}','${password}','${nombre}','${apellido}') RETURNING *;`)
    return result.rows[0]
}
async function buscarUsuario(email,password){

    const result= await pool.query(`SELECT * FROM usuario where email='${email}' AND password='${password}' `)
    return result.rows[0]
}


module.exports = {
    insertarUsuario,buscarUsuario
}