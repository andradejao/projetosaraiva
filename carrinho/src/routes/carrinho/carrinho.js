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

routerCarrinho.get("/listar/:id", (req, res) => {
    data.query(`select foto.foto1,titulo.nometitulo,titulo.autor,carrinho.quantidade,
    preco.precodesconto,titulo.idtitulo,carrinho.total
    from saraivalivrodb.fotos foto inner join saraivalivrodb.titulos titulo
    on foto.idfotos=titulo.idfoto inner join saraivacarrinhodb.carrinho carrinho
    on titulo.idtitulo=carrinho.idproduto inner join saraivalivrodb.precos preco
    on preco.idpreco = titulo.idpreco where carrinho.idusuario=?;`, req.params.id, (error, dados) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao carregar os dados" })
        }
        res.status(200).send({ msg: "Ok", payload: dados })
    })
})

routerCarrinho.post("/cadastrar", (req, res) => {
    data.query("insert into carrinho set ?", req.body, (error, result) => {
        if (error) {
            return res.status(500).send({ msg: "Não foi possível adicionar ao carrinho" })
        }
        res.status(201).send({ msg: "Criado", payload: result })
    })
})

module.exports = routerCarrinho