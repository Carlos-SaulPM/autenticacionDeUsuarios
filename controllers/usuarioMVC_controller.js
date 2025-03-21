const { usuarioBusiness } = require("../business");

const obtenerUsuarios = async (req, res) => {
  const { pagina, limite } = req.query;
  console.log(`Pagina ${pagina} limite: ${limite}`);
  const usuarios = await usuarioBusiness.obtenerUsuarios(pagina, limite);
  console.log(usuarios);
  res.render("usuarios/index", {
    usuarios,
  });
};
const agregarUsuario = async (req, res) => {
  res.render("usuarios/agregar");
};
const guardarUsuario = async (req, res) => {
  await usuarioBusiness.crearUsuario(req.body);
  res.redirect("/mvc/usuarios/");
};

module.exports = { obtenerUsuarios, agregarUsuario, guardarUsuario };
