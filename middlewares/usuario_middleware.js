const Joi = require("joi");
const { encriptar_bcrypt, token_jwt } = require("../libs");

//Solo permite entrada del nombre, primerApellido, segundo apellido y fecha de nacimiento
const validacionCrearUsuario = (req, res, next) => {
  const esquema = Joi.object({
    nombre: Joi.string().min(5).max(20).required(),
    primerApellido: Joi.string().min(2).max(20).required(),
    segundoApellido: Joi.string().min(2).max(20).required(),
    fechaDeNacimiento: Joi.date().iso().min("1920-01-01").required(),
    correo: Joi.string().email().required(),
    password: Joi.string().min(8).max(25).required(),
  });

  const { error, value } = esquema.validate(req.body);

  if (error)
    return res.status(400).json({
      mensaje: "No proporcionaste los datos correctos",
      error: error.details[0].message,
    });
  req.body = value;
  next();
};

//Middleware para validar Id y encodedKey
const validacionObtenerUsuarioPorId = (req, res, next) => {
  const esquema = Joi.object({
    id: Joi.number().integer().optional(),
    encodedKey: Joi.string().optional(),
  }).xor("encodedKey", "id");

  const { error, value } = esquema.validate(req.params, { convert: true });
  if (error)
    return res.status(400).json({
      mensaje: "No proporcionaste el Id o encodedKey valido",
      error: error.details[0].message,
    });

  req.params = value;
  next();
};

//Validar pagina y limite con enteros, Middleware
const validacionObtenerUsuarios = (req, res, next) => {
  const esquema = Joi.object({
    pagina: Joi.number().integer().min(1).default(1),
    limite: Joi.number().integer().min(10).default(10),
  });

  const { error, value } = esquema.validate(req.query, { convert: true });

  if (error) {
    return res.status(400).json({
      mensaje: "No proporcionaste los datos correctos",
      error: error.details.map((err) => err.message),
    });
  }

  req.query = value;
  next();
};

//Middleware para aceptar solamente a id, estaActivo. Guardar las otras propiedades en "otros" con spread operato
const validacionModificarUsuario = (req, res, next) => {
  const esquema = Joi.object({
    id: Joi.number().integer().min(0).required(),
    estaActivo: Joi.boolean().optional(),
    otros: Joi.object().optional(),
  });

  const { id } = req.params;
  const { estaActivo, ...otros } = req.body;
  const datos = {
    id,
    estaActivo,
    otros,
  };

  const { error, value } = esquema.validate(datos, { convert: true });
  if (error)
    return res.status(404).json({
      mensaje: "No proporcionaste algun dato valido",
      error: error.details[0].message,
    });
  req.params.id = value.id;
  req.body.otros = value.otros;
  req.body.estaActivo = value.estaActivo;
  next();
};

//Middleware para parsear el id
const validacionEliminarUsuario = (req, res, next) => {
  const esquema = Joi.object({
    id: Joi.number().integer().min(0).required(),
  });

  const { error, value } = esquema.validate(req.params, { convert: true });
  if (error)
    return res.status(404).json({
      mensaje: "No es un id valido",
      error: error.details[0].message,
    });
  req.params.id = value.id;
  next();
};

const encriptarPassword = async (req, res, next) => {
  await encriptar_bcrypt
    .encriptarCadena(req.body.password)
    .then((password) => {
      req.body.password = password;
    })
    .catch((error) => {
      res
        .status(400)
        .json({
          mensajeError: "Ocurrio un error con la encriptacion de la contrasena",
        });
    });
  next();
};

const validacionToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ mensaje: "No tienes un token" });

  const usuario = await token_jwt.comprobarToken(token);
  // console.log("USUARIO TOKEN: ", usuario);

  if (!usuario)
    return res.status(403).json({ mensajeError: "No tienes un token valido" });

  req.usuario = usuario;
  next();
};

module.exports = {
  validacionCrearUsuario,
  validacionObtenerUsuarioPorId,
  validacionObtenerUsuarios,
  validacionModificarUsuario,
  validacionEliminarUsuario,
  encriptarPassword,
  validacionToken,
};
