const page = (req, res) => {
  res.render("pages/movies-list", {
      title: 'movies-list',
  });
};

module.exports = {
  page,
};
