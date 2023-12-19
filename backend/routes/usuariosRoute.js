const { Router } = require("express")
const usuariosController = require("../controllers/usuariosController")
// const autenticado = require("../middlewares/verificarAutenticacao")


const router = Router()
// router.use(autenticado)

router.post("/usuarios", usuariosController.cadastrar)
    .get("/usuarios", usuariosController.buscarUsuarios)
    .get("/usuarios/:id", usuariosController.buscarPorId)
    .put("/usuarios/:id", usuariosController.editarUsuario)
    .delete("/usuarios/:id", usuariosController.removerUsuario)

module.exports = router