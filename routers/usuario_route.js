const express = require("express");
const router = express.Router();
const { usuarioController } = require("../controllers");
const { usuarioMiddleware } = require("../middlewares");

router.get("/crear", usuarioController.crearUsuario);

router.post(
  "/guardar",
  usuarioMiddleware.validacionCrearUsuario,
  usuarioMiddleware.encriptarPassword,
  usuarioController.guardarUsuario
);

router.get(
  "/:id",
  usuarioMiddleware.validacionObtenerUsuarioPorId,
  usuarioController.obtenerUsuarioPorId
);
router.get(
  "/",
  usuarioMiddleware.validacionObtenerUsuarios,
  usuarioController.obtenerUsuarios
);

router.get(
  "/modificar/:id",
  usuarioMiddleware.validacionModificarUsuario,
  usuarioController.modificandoUsuario
);
router.put(
  "/modificar/:id",
  usuarioMiddleware.validacionModificarUsuario,
  usuarioController.modificarUsuario
);

router.get(
  "/eliminar/:id",
  usuarioMiddleware.validacionEliminarUsuario,
  usuarioController.eliminarUsuario
);



module.exports = router;
