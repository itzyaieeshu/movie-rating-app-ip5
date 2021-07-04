const page = (req, res) => {
  res.render("pages/movie", {
      title: 'movie',
  });
};

module.exports = {
  page,
};
