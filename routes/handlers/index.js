const moviesAPI = require('../services/moviesAPI');

const page = (req, res) => {
  Promise.all([moviesAPI.popularMovies(), moviesAPI.genre('16'), moviesAPI.genre('878'), moviesAPI.genre('53')])
  .then(result => {
    if (!req.session.userId) {
        res.render("pages/index", {
          title: 'Home',
          session: false,
          sessionUser: '',
          popularMovies: result[0].data.results,
          animationMovies: result[1].data.results,
          scifiMovies: result[2].data.results,
          thrillerMovies: result[3].data.results,
      }); 
    } else {
        res.render("pages/index", {
          title: 'Home',
          session: true,
          sessionUser: req.session.firstname,
          popularMovies: result[0].data.results,
          animationMovies: result[1].data.results,
          scifiMovies: result[2].data.results,
          thrillerMovies: result[3].data.results,
      }); 
    }
  })
  .catch(err => console.error(err));
};

module.exports = {
  page,
};
