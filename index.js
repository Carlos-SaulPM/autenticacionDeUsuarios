const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session")
const path = require("path");

require("dotenv").config();

//Routers import
const { usuarioRoute, homeRoute, usuarioMVCRoute } = require("./routers");
//Configuraciones y constantes
const port = process.env.PORT;

//Inicio de la aplicacion
const app = express();

//Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser())
app.use(
  session({
    secret: "ClaveSecreta",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.set("view engine", "ejs");
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

//Routers
app.use("/api", usuarioRoute);
app.use("/", homeRoute);
app.use("/mvc", usuarioMVCRoute);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})
