const moviesAPI = require("../services/moviesAPI");

const movie = (req, res) => {
    moviesAPI.search(req.params.key)
    .then((result) => {
      res.send(result.data)
    })
    .catch((err) => console.error(err));
};

module.exports = {
  movie,
};