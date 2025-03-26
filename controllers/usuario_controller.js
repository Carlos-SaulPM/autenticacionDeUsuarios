const { usuarioBusiness } = require("../business");

const crearUsuario = async (req, res) => {
  res.render("usuarios/crear", { error: null });
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

  res.redirect("/usuarios");
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
  res.render("usuarios", { usuarios });
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
    return res.render("templates/error404", {
      error: "Ocurrio un error al modificar el usuario",
    });
  res.redirect("/usuarios");
};

const modificandoUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await usuarioBusiness.obtenerUsuarioPorId(id);
  if (!usuario) return res.render("templates/error404");
  res.render("usuarios/modificar", { usuario });
};

const eliminarUsuario = async (req, res) => {
  const usuarioEliminado = await usuarioBusiness.eliminarUsuario(req.params.id);
  if (!usuarioEliminado)
    return res.render("templates/error404", {
      error: "Ocurrio un error en la eliminación del usuario",
    });
  res.redirect("/usuarios");
};

module.exports = {
  crearUsuario,
  guardarUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
  modificandoUsuario,
};
