const moviesAPI = require('../services/moviesAPI');

const page = (req, res) => {
  moviesAPI.popularMovies()
  .then(response => {
    res.render("pages/index", {
        title: 'Home',
        popularMovies: response.data.results,
    }); 
  })
  .catch(err => console.error(err));
};

module.exports = {
  page,
};
