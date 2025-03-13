const express = require("express");
const router = express.Router();
const { usuarioController } = require("../controllers");
const { usuarioMiddleware } = require("../middlewares");

router.post(
  "/usuarios/register",
  usuarioMiddleware.validacionCrearUsuario,
  usuarioController.crearUsuario
);
router.get(
  "/usuarios/:id",
  usuarioMiddleware.validacionObtenerUsuarioPorId,
  usuarioController.obtenerUsuarioPorId
);
router.get(
  "/usuarios/",
  usuarioMiddleware.validacionObtenerUsuarios,
  usuarioController.obtenerUsuarios
);
router.put(
  "/usuarios/modificar/:id",
  usuarioMiddleware.validacionModificarUsuario,
  usuarioController.modificarUsuario
);
router.get(
  "/usuarios/eliminar/:id",
  usuarioMiddleware.validacionEliminarUsuario,
  usuarioController.eliminarUsuario
);

module.exports = router;
