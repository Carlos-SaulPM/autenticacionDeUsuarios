const tieneSoloNumeros = (cadena) => {
  const regex = /^[0-9]*$/;
  const onlyNumbers = regex.test(cadena);
  return onlyNumbers;
};

// /**
//  * @param {{}} objeto 
//  * @param {[]} propiedades 
//  * @returns {{}}
//  */
// const extraerPropiedades = (objeto, propiedades) => {
//   return Object.fromEntries(Object.entries(objeto).filter(([llave])=>propiedades.includes(llave)))
// }

module.exports = { tieneSoloNumeros };
