const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares");

//USUARIOS FICTICIOS
const userCredentials = [
  {
    name: "pedro Root",
    email: "user1@gmail.com",
    password: "12345",
    role: "root",
  },
  {
    name: "pablo Admin",
    email: "user2@gmail.com",
    password: "12345",
    role: "admin",
  },
  {
    name: "Carlos User",
    email: "user3@gmail.com",
    password: "12345",
    role: "user",
  },
];

const obtenerUsuarioPorCorreo = (email) => {
  //Simulacion de busqueda en la base de datos
  let user = userCredentials.find((x) => x.email == email);
  console.log("USER: ", user);
  return user;
};
const compararContrasena = (password, passwordHash) => {
  //Se realiza el hasheo del password
  console.log(`passwordBODY: ${password}, passwordHash: ${passwordHash}`);
  let hash = password;
  return hash == passwordHash ? true : false;
};
//-------------

//RUTAS
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Credenciales vacias");
    return res.render("login", { error: "Credenciales vacias" });
  }
  let user = obtenerUsuarioPorCorreo(email);
  if (!user) {
    console.log("Usuario no encontrado");
    return res.render("login", { error: "Credenciales invalidas" });
  }
  let passwordValidated = compararContrasena(password, user.password);
  if (!passwordValidated) {
    console.log("Credenciales incorrectas");
    return res.render("login", { error: "Credenciales invalidas" });
  } else {
    //user.password = "";
    req.session.user = user;
    res.redirect("/");
  }
});

//Sidebar
router.get("/", auth.userLogged, (req, res) => {
  console.log(req.session.user);
  res.render("dashboard", { user: req.session.user });
});

router.get("/profile", auth.userLogged, (req, res) => {
  res.render("profile");
});

router.get("/page_blank", auth.userLogged, (req, res) => {
  res.render("pageBlank");
});

router.get("/buttons", auth.userLogged, (req, res) => {
  res.render("buttons");
});

router.get("/forms", auth.userLogged, (req, res) => {
  res.render("forms");
});

router.get("/cards", auth.userLogged, (req, res) => {
  res.render("cards");
});

router.get("/typography", auth.userLogged, (req, res) => {
  res.render("typography");
});

router.get("/icons", auth.userLogged, (req, res) => {
  res.render("icons");
});

router.get("/charts", auth.userLogged, (req, res) => {
  res.render("charts");
});
router.get("/maps", auth.userLogged, (req, res) => {
  res.render("maps");
});

module.exports = router;
