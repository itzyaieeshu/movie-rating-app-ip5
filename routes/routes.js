const index = require('./handlers/index');
const login = require('./handlers/login');
const signup = require('./handlers/signup');
const moviesList = require('./handlers/moviesList');
const movie = require('./handlers/movie');
const moviesAPI = require('./handlers/moviesAPI');
const error = require('./handlers/error');

module.exports = (app) => {
    app.get('/', index.page),
    app.get('/login', login.page),
    app.post('/login', login.loginFormSubmit),
    app.get('/logout', login.logoutFormSubmit),
    app.get('/signup', signup.page),
    app.post('/signup', signup.signupFormSubmit),
    app.get('/movies', moviesList.page),
    app.get('/movie/:id', movie.page),
    app.get('/api/discover/movie', moviesAPI.getPopularMovies),
    app.get('/*', error.pageNotFound)
}