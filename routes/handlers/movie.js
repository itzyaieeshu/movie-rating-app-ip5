const moviesAPI = require("../services/moviesAPI");
const db = require('../../config/database')

const page = (req, res) => {
  Promise.all([
    moviesAPI.movie(req.params.id),
    moviesAPI.movieCredits(req.params.id),
    moviesAPI.popularMovies(),
  ])
    .then((results) => {
         db.oneOrNone('SELECT ROUND(AVG(rating),0) FROM ratings where movie_id = $1;',[req.params.id]) 
        .then(({round: average}) => {   //Destructurinf the round to average to use as average rather than round
            res.render("pages/movie", {
              title: "movie",
              session: !req.session.userId ? false : true,
              sessionUser: !req.session.userId ? "" : req.session.firstname,
              movie: results[0].data,
              movieCredits: results[1].data,
              popularMovies: results[2].data.results,
              message: req.query.message,
              successMessage: req.query.successMessage,
              averageRating: average
            });
          })
          //Query to get average rating failed
          .catch(err => {
            console.log("Query to get average rating failed")
            res.render("pages/error", {
                message: err.message + " " + err.query,
            });
          })  
    })
    .catch((err) => console.error(err));
};

module.exports = {
  page,
};
