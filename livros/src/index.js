require('dotenv').config()
const express = require('express')
const routerTitulo = require("./routes/titulos/titulos.js")

const app = express()
app.use(express.json())

app.use("/api/v1/livros", routerTitulo)

app.listen(process.env.HOST_PORT, () => console.log(`Servidor Online em ${process.env.HOST_NAME}:${process.env.HOST_PORT}`))