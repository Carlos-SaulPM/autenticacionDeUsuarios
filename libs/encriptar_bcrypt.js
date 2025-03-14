const bcrypt = require("bcryptjs");

const encriptarCadena = (cadena) => bcrypt.hash(cadena, 10);

const compararCadenaEncriptada = (cadena,cadenaAComparar) => bcrypt.compare(cadena,cadenaAComparar)

module.exports = {encriptarCadena, compararCadenaEncriptada}