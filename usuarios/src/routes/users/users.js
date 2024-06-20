require('dotenv').config()
const express = require('express')
const router = express.Router()
const data = require('../../database/config.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verificar = require('../../middleware/verify_token.js')
const morgan = require('morgan')
const insertRegister = require('../observer/register.js')
const salt = Number(process.env.SALT)

router.use(morgan('combined'))
let remoteData = morgan('combined')

let tmp = new Date()
let date_time = `${tmp.getFullYear()}-${tmp.getMonth() + 1}-${tmp.getDate()} ${tmp.getHours()}:${tmp.getMinutes()}:${tmp.getSeconds()}`
let idusuario = ""


router.get("/listar", (req, res) => {
    insertRegister(idusuario, date_time, 1, "/listar", remoteData.toString())
    data.query("select * from usuario", (error, dados) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao selecionar os dados" })
        }
        res.status(200).send({ msg: "Ok", payload: dados })
    })
})

router.post("/cadastrar", (req, res) => {
    let sh = req.body.senha
    bcrypt.hash(sh, salt, (error, crypt) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao tentar cadastrar" })
        }
        req.body.senha = crypt
        data.query("insert into usuario set ?", req.body, (error, result) => {
            if (error) {
                return res.status(500).send({ msg: "Erro ao cadastrar" })
            }
            res.status(201).send({ msg: "Cadastrado", payload: result })
        })
    })
})

router.put("/alterarfoto/:id", verificar, (req, res) => {
    insertRegister(result[0].idusuario, date_time, 1, `/alterarfoto/${req.params.id}`, remoteData.toString())
    data.query("update usuario set ? where idusuario=?", [req.body, req.params.id], (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao atualizar" })
        }
        res.status(200).send({ msg: "Atualizado", payload: result })
    })
})

router.put("/alterarsenha/:id", (req, res) => {
    insertRegister(result[0].idusuario, date_time, 1, `/alterarsenha/${req.params.id}`, remoteData.toString())
    let sh = req.body.senha
    bcrypt.hash(sh, salt, (error, crypt) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao atualizar a senha" })
        }
        req.body.senha = crypt
        data.query("update usuario set ? where idusuario=?", [req.body, req.params.id], (error, result) => {
            if (error) {
                return res.status(500).send({ msg: "Erro ao atualizar a senha" })
            }
            res.status(200).send({ msg: "Atualizado", payload: result })
        })
    })
})

router.get("/buscarporid/:id", (req, res) => {
    insertRegister(result[0].idusuario, date_time, 1, `/buscarporid${req.params.id}`, remoteData.toString())
    data.query("select * from usuario where idusuario=?", req.params.id, (error, dados) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao selecionar os dados" })
        }
        res.status(200).send({ msg: "Ok", payload: dados })
    })
})

router.get("/buscarporusuario/:usuario", (req, res) => {
    insertRegister(result[0].idusuario, date_time, 1, `/buscarporusuario${req.params.usuario}`, remoteData.toString())
    data.query("select * from usuario where nomeusuario=?", req.params.usuario, (error, dados) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao selecionar os dados" })
        }
        res.status(200).send({ msg: "Ok", payload: dados })
    })
})

router.post("/login", (req, res) => {
    let sh = req.body.senha
    data.query("select * from usuario where nomeusuario=?", req.body.nomeusuario, (error, result) => {
        if (error || result[0] == null) {
            insertRegister(0, date_time, 1, "/login", remoteData.toString())
            return res.status(400).send({ msg: "Usuário ou senha incorreto" })
        }
        bcrypt.compare(sh, result[0].senha, (err, same) => {
            if (err) {
                return res.status(500).send({ msg: "Erro ao processar o login" })
            }
            else if (same == false) {
                return res.status(400).send({ msg: "Usuário ou senha incorreto" })
            } else {
                insertRegister(result[0].idusuario, date_time, 1, "/login", remoteData.toString())
                idusuario = result[0].idusuario
                let token = jwt.sign(
                    {
                        idusuario: result[0].idusuario,
                        nomeusuario: result[0].nomeusuario
                    },
                    process.env.JWT_KEY, { expiresIn: "2d" }
                )
                res.status(200).send({ msg: "Autenticado", token: token })

            }
        })
    })
})

module.exports = router