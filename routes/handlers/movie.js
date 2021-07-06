const page = (req, res) => {
  res.render("pages/movie", {
      title: 'Movie',
  });
};

module.exports = {
  page,
};
