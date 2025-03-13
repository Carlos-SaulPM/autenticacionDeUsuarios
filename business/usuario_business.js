const { usuarioRepository } = require("../repositories");
const { Usuario } = require("../models");


const crearUsuario = async (datosUsuario) => { //Objeto de JS
  const usuario = new Usuario(datosUsuario.nombre, datosUsuario.primerApellido, datosUsuario.segundoApellido, datosUsuario.fechaDeNacimiento);
  //Inicio de usuarios duplicados.
  //Fin de usuarios duplicados.
  const usuarioCreado = await usuarioRepository.agregarNuevoUsuario(usuario);
  return usuarioCreado;
};

const obtenerUsuarioPorId = async (idUsuario) => {
  const usuarioObtenido = await usuarioRepository.obtenerUsuarioPorId(idUsuario);
  return usuarioObtenido;
};

const obtenerUsuarios = async (pagina, limite) => {
  const usuarios = await usuarioRepository.obtenerUsuarios(pagina, limite);
  return usuarios;
};

const modificarUsuario = async (datosAModificar) => {
  const modificacion = await usuarioRepository.modificarUsuario(datosAModificar);
  return modificacion;
};

const eliminarUsuario = async (idUsuario) => {
  const eliminarUsuario = usuarioRepository.eliminarUsuario(idUsuario);
  return eliminarUsuario;
};

module.exports = {
  crearUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
};
