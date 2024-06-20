// Importação do dotenv que gerencia o .env e o configura
require('dotenv').config()
// Importação do mysql2 para acessar o db mysql
const mysql = require('mysql2')

const con = mysql.createConnection({
    host: process.env.HOST_DATABASE,
    port: process.env.DATABASE_PORT,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME
})
// Exportando a const con para que configuração do
// db fique disponível para ser acessada por outro arquivo
module.exports = con