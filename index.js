const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cookieParser = require("cookie-parser");

require("dotenv").config();

//Routers import
const { usuarioRoute } = require("./routers");
//Configuraciones y constantes
const port = process.env.PORT;

//Inicio de la aplicacion
const app = express();

//Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())
app.use(cookieParser())

//Routers
app.use("/api", usuarioRoute);


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})
