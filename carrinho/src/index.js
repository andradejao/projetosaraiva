require('dotenv').config()
const express = require('express')
const routerCarrinho = require('./routes/carrinho/carrinho.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/v1/carrinho", routerCarrinho)

app.listen(process.env.HOST_PORT, () => {
    console.log(`Servidor Online em ${process.env.HOST_NAME}:${process.env.HOST_PORT}`)
})