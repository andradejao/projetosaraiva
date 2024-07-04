require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routerTitulo = require("./routes/titulos/titulos.js")
const routerPreco = require("./routes/precos/precos.js")
const routerFoto = require("./routes/fotos/fotos.js")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/v1/livros", routerTitulo)
app.use("/api/v1/precos", routerPreco)
app.use("/api/v1/fotos", routerFoto)

app.listen(process.env.HOST_PORT, () => console.log(`Servidor Online em ${process.env.HOST_NAME}:${process.env.HOST_PORT}`))