const moviesAPI = require('../services/moviesAPI');

const page = (req, res) => {
  Promise.all([moviesAPI.movie(req.params.id), moviesAPI.movieCredits(req.params.id), moviesAPI.popularMovies()])
  .then(results => {
      res.render("pages/movie", {
      title: 'movie',
      movie: results[0].data,
      movieCredits: results[1].data,
      popularMovies: results[2].data.results,
    });
  })
  .catch(err => console.error(err));

};

module.exports = {
  page,
};
