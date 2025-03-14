const jwt = require("jsonwebtoken")
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const crearToken = (cifrar) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      cifrar,
      TOKEN_SECRET,
      {
        expiresIn: "1h"
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    )
  })
}

const comprobarToken = (token) => {
  return new Promise((resolve, reject) => {
     jwt.verify(token, TOKEN_SECRET, (err, user) => {
       if (err) reject(err);
       resolve(user);
     });
  })
 
}

module.exports = {crearToken, comprobarToken}