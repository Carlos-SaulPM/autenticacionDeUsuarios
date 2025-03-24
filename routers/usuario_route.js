const express = require("express");
const router = express.Router();
const { usuarioController } = require("../controllers");
const { usuarioMiddleware } = require("../middlewares");

router.get("/register", usuarioController.crearUsuario);

router.post(
  "/register",
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
router.put(
  "/modificar/:id",
  usuarioMiddleware.validacionModificarUsuario,
  usuarioController.modificarUsuario
);
// router.get(
//   "/eliminar/:id",
//   usuarioMiddleware.validacionEliminarUsuario,
//   usuarioController.eliminarUsuario
// );

// router.post("/login", usuarioController.loginUsuario);

// router.post("/logout", usuarioController.logoutUsuario);

// router.get(
//   "/perfil/:id",
//   usuarioMiddleware.validacionToken,
//   usuarioMiddleware.validacionObtenerUsuarioPorId,
//   usuarioController.obtenerUsuarioPorId
// );

module.exports = router;
