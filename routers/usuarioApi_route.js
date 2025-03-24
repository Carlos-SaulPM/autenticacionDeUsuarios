const express = require("express");
const router = express.Router();
const { usuarioApiController } = require("../controllers");
const { usuarioApiMiddleware } = require("../middlewares");

router.post(
  "/usuarios/register",
  usuarioApiMiddleware.validacionCrearUsuario,
  usuarioApiMiddleware.encriptarPassword,
  usuarioApiController.crearUsuario
);
router.get(
  "/usuarios/:id",
  usuarioApiMiddleware.validacionObtenerUsuarioPorId,
  usuarioApiController.obtenerUsuarioPorId
);
router.get(
  "/usuarios/",
  usuarioApiMiddleware.validacionObtenerUsuarios,
  usuarioApiController.obtenerUsuarios
);
router.put(
  "/usuarios/modificar/:id",
  usuarioApiMiddleware.validacionModificarUsuario,
  usuarioApiController.modificarUsuario
);
router.get(
  "/usuarios/eliminar/:id",
  usuarioApiMiddleware.validacionEliminarUsuario,
  usuarioApiController.eliminarUsuario
);

router.post("/usuarios/login", usuarioApiController.loginUsuario);

router.post("/usuarios/logout", usuarioApiController.logoutUsuario);

router.get(
  "/usuarios/perfil/:id",
  usuarioApiMiddleware.validacionToken,
  usuarioApiMiddleware.validacionObtenerUsuarioPorId,
  usuarioApiController.obtenerUsuarioPorId
);



module.exports = router;
