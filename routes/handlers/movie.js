const moviesAPI = require('../services/moviesAPI');

const page = (req, res) => {
  moviesAPI.movie(req.params.id)
  .then(response => {
      res.render("pages/movie", {
      title: 'movie',
      movie: response.data,
    });
  })
  .catch(err => console.error(err));

};

module.exports = {
  page,
};
