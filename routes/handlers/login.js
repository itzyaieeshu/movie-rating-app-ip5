const page = (req, res) => {
  res.render("pages/login", {
      title: 'Login',
  });
};

module.exports = {
  page,
};
