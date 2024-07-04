require('dotenv').config()
const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
    const tk = req.headers.token
    if (!tk) {
        return res.status(401).send({ msg: "Efetue o login" })
    }
    jwt.verify(tk, process.env.JWT_KEY, { expires: process.env.JWT_EXPIRES }, (error, dados) => {
        if (error) {
            return res.status(401).send({ msg: "Sua sessão expirou. Efetue o login novamente" })
        }
        next()
    })
}

module.exports = verify