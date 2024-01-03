const User = require("../models/user.model");

function getSignup(req, res, next) {
  res.render("customer/auth/signup");
}

async function signup(req, res) {
  const data = req.body;
  const user = new User(
    data.email,
    data.password,
    data.fullname,
    data.street,
    data.postal,
    data.city
  );

  await user.signup();
  res.redirect("/login");
}

function getLogin(req, res, next) {
  res.render("customer/auth/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
