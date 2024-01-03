function getSignup(req, res, next) {
  res.render("customer/auth/signup");
}

function signup(req, res) {}

function getLogin(req, res, next) {}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
