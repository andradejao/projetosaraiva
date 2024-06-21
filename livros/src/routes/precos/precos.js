const express = require('express')
const routerPreco = express.Router()
const data = require("../../database/config.js")

routerPreco.post("/cadastrar", (req, res) => {
    data.query("insert into precos set ?", req.body, (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao cadastrar" })
        }
        res.status(201).send({ msg: "Criado", payload: result })
    })
})

module.exports = routerPreco