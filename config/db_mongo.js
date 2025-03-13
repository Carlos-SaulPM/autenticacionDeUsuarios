const { MongoClient } = require("mongodb");

const uri = process.env.DB_URL;
const client = new MongoClient(uri);

const COLLECTION = "usuarios";


const conexionDb = async () => {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
    console.log(`Conexion a MongoDb satisfactoria`);
  }
  return client.db(COLLECTION);
};

module.exports = {conexionDb, COLLECTION};