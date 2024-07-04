const express = require('express')
const routerTitulo = express.Router()
const data = require("../../database/config.js")

routerTitulo.get("/listar", (req, res) => {
    data.query("select * from titulos", (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao carregar os títulos" })
        }
        res.status(200).send({ msg: "Ok", payload: result })
    })
})

routerTitulo.get("/detalhes", (req, res) => {
    data.query(`SELECT t.idtitulo, t.nometitulo, t.autor, t.sinopse, t.datacadastro,
    p.precoatual, p.precodesconto, f.foto1, f.foto2, f.foto3, f.foto4
    FROM precos p INNER JOIN titulos t ON p.idpreco = t.idpreco 
    INNER JOIN fotos f ON t.idfoto = f.idfotos`, (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao carregar os títulos" })
        }
        res.status(200).send({ msg: "Ok", payload: result })
    })
})

routerTitulo.get("/detalhes/:id", (req, res) => {
    data.query(`SELECT t.idtitulo, t.nometitulo, t.autor, t.sinopse, t.datacadastro,
    p.precoatual, p.precodesconto, f.foto1, f.foto2, f.foto3, f.foto4
    FROM precos p INNER JOIN titulos t ON p.idpreco = t.idpreco 
    INNER JOIN fotos f ON t.idfoto = f.idfotos where t.idtitulo = ?`, req.params.id, (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao carregar os títulos" })
        }
        res.status(200).send({ msg: "Ok", payload: result })
    })
})

routerTitulo.get("/detalhes/titulo/:nome", (req, res) => {
    data.query(`SELECT t.idtitulo, t.nometitulo, t.autor, t.sinopse, t.datacadastro,
    p.precoatual, p.precodesconto, f.foto1, f.foto2, f.foto3, f.foto4
    FROM precos p INNER JOIN titulos t ON p.idpreco = t.idpreco 
    INNER JOIN fotos f ON t.idfoto = f.idfotos where t.nometitulo like ?`, "%"+req.params.nome+"%", (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao carregar os títulos" } + error)
        }
        res.status(200).send({ msg: "Ok", payload: result })
    })
})

routerTitulo.post("/cadastrar", (req, res) => {
    data.query("insert into titulos set ?", req.body, (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao cadastrar" })
        }
        res.status(201).send({ msg: "Criado", payload: result })
    })
})

module.exports = routerTitulo