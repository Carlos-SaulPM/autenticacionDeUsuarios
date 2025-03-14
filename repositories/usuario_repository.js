const { dbMongo } = require("../config");
const { COLLECTION } = require("../config/db_mongo");
const { utilidades } = require("../helpers");

const agregarNuevoUsuario = async (usuario) => {
  //Objeto class usuario
  try {
    const db = await dbMongo.conexionDb();
    const dbCollection = db.collection(dbMongo.COLLECTION);

    const totalDocumentos = await dbCollection.countDocuments();
    let id = totalDocumentos + 1;

    let resultado = await dbCollection.insertOne({
      id,
      nombre: usuario.getNombre,
      primerApellido: usuario.getPrimerApellido,
      segundoApellido: usuario.getSegundoApellido,
      fechaDeNacimiento: usuario.getFechaDeNacimiento,
      estaActivo: usuario.getEstaActivo,
      fechaDeRegistro: usuario.getFechaDeRegistro,
      correo: usuario.getCorreo,
      password: usuario.getPassword
      // otros: usuario.getOtros,
    });

    return resultado;
  } catch (error) {
    console.log("Ocurrio un error para agregar un nuevo usuario: ", error);
  }
};

//idUsuario tiene que pasar como numero en caso de ser ID.
const obtenerUsuarioPorId = async (idUsuario) => {
  try {
    const db = await dbMongo.conexionDb();
    const dbCollection = db.collection(COLLECTION);
    const campoBusquedaId = utilidades.tieneSoloNumeros(idUsuario)
      ? "id"
      : "endodedKey";
    const usuario = await dbCollection.findOne({
      [campoBusquedaId]: idUsuario,
      estaActivo: true,
    });
    return usuario;
  } catch (error) {
    console.log("Ocurrio un error para agregar obtener el usuario: ", error);
  }
};

//Tienen que llegar como numeros enteros
const obtenerUsuarios = async (pagina, limite) => {
  try {
    const db = await dbMongo.conexionDb();
    const dbCollection = db.collection(dbMongo.COLLECTION);
    const lista = await dbCollection
      .find({ estaActivo: true })
      .skip((pagina - 1) * limite)
      .limit(limite)
      .toArray();
    const totalDocumentos = await dbCollection.countDocuments();
    return {
      pagina,
      limite,
      totalDocumentos,
      totalPaginas: Math.ceil(totalDocumentos / limite),
      lista,
    };
  } catch (error) {
    console.log("error :>> ", error);
  }
};

//Llega un objeto JS con los cambios y el id del usuario.
const modificarUsuario = async (datosAModificar) => {
  try {
    const db = await dbMongo.conexionDb();
    const dbCollection = db.collection(COLLECTION);
    const usuarioActual = await obtenerUsuarioPorId(
      datosAModificar.id
    );

    const propiedadesPermitidas = [
      "estaActivo",
      "otros"
    ];
    const datosAActualizar = {};
    for (const propiedad of propiedadesPermitidas) {
      if (usuarioActual[propiedad] !== datosAModificar[propiedad]) {
        datosAActualizar[propiedad] = datosAModificar[propiedad];
      }
    }

    const resultado = await dbCollection.updateOne(
      { id: usuarioActual.id },
      { $set: datosAActualizar }
    );

    return resultado;
  } catch (error) {
    console.log(`RP - Ocurrio un error al modificar el usuario: ${error}`);
  }
};
//Id usuario debe pasar como numero
const eliminarUsuario = async (idUsuario) => {
  try {
    const existeCliente = await obtenerUsuarioPorId(idUsuario);
    if (!existeCliente) {
      console.log(`No existe el usuario con el id: ${idUsuario}`);
      return existeCliente;
    }

    const usuarioEliminado = await modificarUsuario({id: idUsuario, estaActivo: false})

    return usuarioEliminado;
  } catch (error) {
    console.log(`RP - Ocurrio un error al eliminar el usuario: ${error}`);
  }
};

const obtenerUsuarioPorCorreo = async (correo) => {
  try {
    const db = await dbMongo.conexionDb();
    const dbCollection = db.collection(COLLECTION);
    const usuario = await dbCollection.findOne({
      correo,
      estaActivo: true,
    });
    return usuario;
  } catch (error) {
    console.log("Ocurrio un error para agregar obtener el usuario: ", error);
  }
}

module.exports = {
  agregarNuevoUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorCorreo
};
