const moviesAPI = require("../services/moviesAPI");

const getPopularMovies = (req, res) => {
  moviesAPI
    .popularMovies()
    .then((response) => {
      res.send(response.data.results);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  getPopularMovies,
};
