const moviesAPI = require('../services/moviesAPI');

const getGenreMovies = (req, res) => {
    moviesAPI.getGenreMovies(req.params.id)
    .then(response => {
        res.render("pages/movies-list", {
             title: 'Movies-List',
             genreMovies: response.data.results
        })
    })  
    .catch(err => console.error(err));
}

module.exports = {
  getGenreMovies,
};
