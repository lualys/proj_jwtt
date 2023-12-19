const { verify, decode } = require("jsonwebtoken")
const jsonSecret = require("../config/jsonSecret.js")


module.exports = async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).send({ message: "Token não informado" })
    }
    const [bearer, accessToken] = token.split(" ")
    try {
        verify(accessToken, jsonSecret.secret)
        const { id, email } = await decode(accessToken)
        req.usuarioId = id
        req.usuarioEmail = email
        return next()
    } catch (err) {
        res.status(401).send({ message: "Token inválido" })

    }
}