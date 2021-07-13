const moviesAPI = require('../services/moviesAPI');

const getGenreMovies = (req, res) => {
    Promise.all ([moviesAPI.genre(req.params.id), moviesAPI.genreLists()])
    .then(result => {
        let genreIndex = result[1].data.genres.findIndex(x => x.id == req.params.id)
        res.render("pages/movies-list", {
             title: 'Movies-List',
             session: !req.session.userId ? false : true,
             sessionUser: !req.session.userId ? "" : req.session.firstname,
             genreMovies: result[0].data.results,
             genreName: (genreIndex>=0) ? result[1].data.genres[genreIndex].name : '',
        })
    })  
    .catch(err => {
      console.error(err)     
      res.render("pages/error", {
          message: err.message + " " + err.query,
      });
    }) 
}

module.exports = {
  getGenreMovies,
};
