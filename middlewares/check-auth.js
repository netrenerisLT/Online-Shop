function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;

  if (!uid) {
    return next();
  }

  res.locals.uuid = uid;
  res.locals.isAuth = true;
  next();
}

module.exports = checkAuthStatus;
