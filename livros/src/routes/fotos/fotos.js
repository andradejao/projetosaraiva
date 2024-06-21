const express = require('express')
const routerFoto = express.Router()
const data = require("../../database/config.js")

routerFoto.post("/cadastrar", (req, res) => {
    data.query("insert into fotos set ?", req.body, (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao cadastrar" })
        }
        res.status(201).send({ msg: "Criado", payload: result })
    })
})

module.exports = routerFoto