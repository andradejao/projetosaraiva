const express = require('express')
const routerCarrinho = express.Router()
const data = require('../../database/config.js')

routerCarrinho.get("/listar", (req, res) => {
    data.query("select * from carrinho", (error, dados) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao carregar os dados" })
        }
        res.status(200).send({ msg: "Ok", payload: dados })
    })
})

module.exports = routerCarrinho