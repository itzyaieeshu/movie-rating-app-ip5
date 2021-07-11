const createError = require("http-errors");

const routeProtector = (req, res, next) => {
  if (req.session && req.session.user) return next();
  throw createError(403, "Forbidden");
};

const redirectToHome = (req, res, next) => req.session && req.session.userId ? res.redirect("/") : next();

module.exports = {
  redirectToHome,
};
