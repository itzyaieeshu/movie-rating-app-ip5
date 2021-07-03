const index = require('./handlers/index');
const login = require('./handlers/login');
const signup = require('./handlers/signup');
const moviesList = require('./handlers/moviesList');
const movie = require('./handlers/movie');
const moviesAPI = require('./services/moviesAPI');

module.exports = (app) => {
    app.get('/', index.page),
    app.get('/login', login.page),
    app.get('/signup', signup.page),
    app.get('/movies', moviesList.page),
    app.get('/movie', movie.page),
    app.get('/api/discover/movie', moviesAPI.popularMovies)
}