const page = (req, res) => {
  res.render("pages/signup", {
      title: 'Signup',
  });
};

module.exports = {
  page,
};
