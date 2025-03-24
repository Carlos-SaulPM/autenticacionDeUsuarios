const { usuarioBusiness } = require("../business");

//----
const crearUsuario = async (req, res) => {
  res.render("usuarios/crear");
};

const guardarUsuario = async (req, res) => {
  const datosDelUsuario = {
    nombre: req.body.nombre,
    primerApellido: req.body.primerApellido,
    segundoApellido: req.body.segundoApellido,
    fechaDeNacimiento: req.body.fechaDeNacimiento,
    correo: req.body.correo,
    password: req.body.password,
  };
  // console.log("CONTROLLER: PASSWORD-REGISTER ", datosDelUsuario.password);
  const usuarioCreado = await usuarioBusiness.crearUsuario(datosDelUsuario);
  if (!usuarioCreado) {
    return res.render("templates/error404", {
      error: "Ocurrio un error en la creacion del usuario",
    });
  }
  // const token = await token_jwt.crearToken({ correo: datosDelUsuario.correo });
  // res.cookie("token", token);

  res.redirect("usuarios");
};

const obtenerUsuarioPorId = async (req, res) => {
  //console.log(typeof req.params.id);
  let usuarioEncontrado = await usuarioBusiness.obtenerUsuarioPorId(
    req.params.id
  );
  res.render("usuarios", { usuarioEncontrado });
};

const obtenerUsuarios = async (req, res) => {
  const { pagina, limite } = req.query;
  const usuarios = await usuarioBusiness.obtenerUsuarios(pagina, limite);
  res.render("usuarios", {usuarios});
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
  res.redirect("/usuarios");
};

const eliminarUsuario = async (req, res) => {
  const usuarioEliminado = await usuarioBusiness.eliminarUsuario(req.params.id);
  if (!usuarioEliminado)
    return res
      .status(404)
      .json({ mensajeError: "No se encontro el usuario con ese id" });
  res.redirect("/usuarios/");
};

module.exports = {
  crearUsuario,
  guardarUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
};
