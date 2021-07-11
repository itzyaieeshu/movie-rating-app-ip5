const moviesAPI = require("../services/moviesAPI");

const page = (req, res) => {
  Promise.all([
    moviesAPI.popularMovies(),
    moviesAPI.genre("16"),
    moviesAPI.genre("878"),
    moviesAPI.genre("53"),
  ])
    .then((result) => {
      res.render("pages/index", {
        title: "Home",
        session: !req.session.userId ? false : true,
        sessionUser: !req.session.userId ? "" : req.session.firstname,
        popularMovies: result[0].data.results,
        animationMovies: result[1].data.results,
        scifiMovies: result[2].data.results,
        thrillerMovies: result[3].data.results,
      });
    })
    .catch((err) => console.error(err));
};

module.exports = {
  page,
};
