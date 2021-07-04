const page = (req, res) => {
  res.render("pages/index", {
      title: 'Home',
  });
};

module.exports = {
  page,
};
