const User = require("../models/user.model");
const authentication = require("../util/authentication");

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

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.getUserWithSameEmail();

  if (!existingUser) {
    res.redirect("/login");
    return;
  }

  const passwordMatch = await user.comparePassword(existingUser.password);

  if (!passwordMatch) {
    res.redirect("/login");
    return;
  }

  authentication.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
};
