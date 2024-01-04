const User = require("../models/user.model");
const authentication = require("../util/authentication");
const validation = require("../util/validations");

function getSignup(req, res, next) {
  res.render("customer/auth/signup");
}

async function signup(req, res, next) {
  const data = req.body;

  if (
    !validation.userDetailsAreValid(
      data.email,
      data.password,
      data.fullname,
      data.street,
      data.postal,
      data.city
    ) ||
    !validation.emailMatches(data.email, data["confirm-email"])
  ) {
    res.redirect("/signup");
    return;
  }

  const user = new User(
    data.email,
    data.password,
    data.fullname,
    data.street,
    data.postal,
    data.city
  );

  try {
    const existEmailAlready = await user.existingEmailAlready();

    if (existEmailAlready) {
      res.redirect("/signup");
      return;
    }

    await user.signup();
  } catch (error) {
    return next(error);
  }

  res.redirect("/login");
}

function getLogin(req, res, next) {
  res.render("customer/auth/login");
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;

  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    return next(error);
  }

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

function logout(req, res) {
  authentication.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
