const pageNotFound = (req, res) => {
  res.render('pages/error', {
      Error: '404 - Page not found',
      message: '404 - Page not found',
  })
};

module.exports = {
  pageNotFound,
};
