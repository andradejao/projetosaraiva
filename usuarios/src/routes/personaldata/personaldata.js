require('dotenv').config()
const express = require('express')
const routerPersonal = express.Router()
const data = require('../../database/config.js')
const verificar = require("../../middleware/verify_token.js")

routerPersonal.get("/listar", verificar, (req, res) => {
    data.query("select * from dadospessoais", (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao selecionar os dados" })
        }
        res.status(200).send({ msg: "Ok", payload: result })
    })
})

routerPersonal.get("/listar/:cpf", verificar, (req, res) => {
    data.query("select * from dadospessoais where iddadospessoais=?", req.params.cpf, (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao selecionar os dados" })
        }
        res.status(200).send({ msg: "Ok", payload: result })
    })
})

routerPersonal.post("/cadastrar", verificar, (req, res) => {
    data.query("insert into dadospessoais set ?", req.body, (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao cadastrar os dados" })
        }
        res.status(201).send({ msg: "Criado", payload: result })
    })
})

routerPersonal.put("/atualizar/:id", verificar, (req, res) => {
    data.query("update dadospessoais set ? where iddadospessoais=?", [req.body, req.params.id], (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao atualizar os dados" })
        }
        res.status(200).send({ msg: "Atualizado", payload: result })
    })
})

module.exports = routerPersonal