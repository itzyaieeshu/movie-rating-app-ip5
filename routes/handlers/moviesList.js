const moviesAPI = require('../services/moviesAPI');

const getGenreMovies = (req, res) => {
    Promise.all ([moviesAPI.genre(req.params.id), moviesAPI.genreLists()])
    .then(result => {
        let genreIndex = result[1].data.genres.findIndex(x => x.id == req.params.id)
        res.render("pages/movies-list", {
             title: 'Movies-List',
             genreMovies: result[0].data.results,
             genreName: (genreIndex>=0) ? result[1].data.genres[genreIndex].name : '',
        })
    })  
    .catch(err => console.error(err));
}

module.exports = {
  getGenreMovies,
};
