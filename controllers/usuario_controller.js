const { usuarioBusiness } = require("../business");
//Los datos estan parseados en el middleware

const crearUsuario = async (req, res) => {
  const datosDelUsuario = {
    nombre: req.body.nombre,
    primerApellido: req.body.primerApellido,
    segundoApellido: req.body.segundoApellido,
    fechaDeNacimiento: req.body.fechaDeNacimiento,
  };

  const usuarioCreado = await usuarioBusiness.crearUsuario(datosDelUsuario);
  if (!usuarioCreado) {
    return res
      .status(404)
      .json({ mensajeError: "Hubo un problema para crear el usuario" });
  }

  res.status(201).json(usuarioCreado);
};

const obtenerUsuarioPorId = async (req, res) => {
  console.log(typeof req.params.id);
  let usuarioEncontrado = await usuarioBusiness.obtenerUsuarioPorId(
    req.params.id
  );
  if (!usuarioEncontrado)
    return res.status(404).json({ mensajeError: "No se encontro el usuario" });
  res.status(200).json(usuarioEncontrado);
};

const obtenerUsuarios = async (req, res) => {
  const { pagina, limite } = req.query;
  const usuarios = await usuarioBusiness.obtenerUsuarios(pagina, limite);
  res.status(200).json(usuarios);
};

const modificarUsuario = async (req, res) => {
  const id = req.params.id;
  const { estaActivo, otros } = req.body;
  const usuarioModificado = await usuarioBusiness.modificarUsuario({
    id,
    estaActivo,
    otros,
  });
  if (!usuarioModificado)
    return res
      .status(404)
      .json({ mensajeError: "No se pudo modificar los datos" });
  res.status(200).json(usuarioModificado);
};

const eliminarUsuario = async (req, res) => {
  const id = req.params.id;
  const usuarioEliminado = await usuarioBusiness.eliminarUsuario(id);
  if (!usuarioEliminado) return res.status(404).json({ mensajeError: "No se encontro el usuario con ese id" })
  res.status(200).json({mensaje: "Se ha eliminado el usuario"})
};

module.exports = {
  crearUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
};
