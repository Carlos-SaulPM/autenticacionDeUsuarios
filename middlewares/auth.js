const userLogged = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.redirect("login")
  }
  next();
};



module.exports ={userLogged}