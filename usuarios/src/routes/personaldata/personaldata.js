require('dotenv').config()
const express = require('express')
const routerPersonal = express.Router()
const data = require('../../database/config.js')
const router = require('../users/users')

routerPersonal.get("/listar", (req, res) => {
    data.query("select * from dadospessoais", (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao selecionar os dados" })
        }
        res.status(200).send({ msg: "Ok", payload: result })
    })
})

routerPersonal.get("/listar/:cpf", (req, res) => {
    data.query("select * from dadospessoais where iddadospessoais=?", req.params.cpf, (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao selecionar os dados" })
        }
        res.status(200).send({ msg: "Ok", payload: result })
    })
})

routerPersonal.post("/cadastrar", (req, res) => {
    data.query("insert into dadospessoais set ?", req.body, (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao cadastrar os dados" })
        }
        res.status(201).send({ msg: "Criado", payload: result })
    })
})