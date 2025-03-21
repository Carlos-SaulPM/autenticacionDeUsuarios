const express = require("express");
const router = express.Router();

const { usuarioMVCController } = require("../controllers");
const { usuarioMiddleware } = require("../middlewares");

router.get(
  "/usuarios/",
  usuarioMiddleware.validacionObtenerUsuarios,
  usuarioMVCController.obtenerUsuarios
);
router.get(
  "/usuarios/agregar",
  usuarioMVCController.agregarUsuario
);
router.post(
  "/usuarios/agregar",
  usuarioMVCController.guardarUsuario
);



module.exports = router;