const index = require('./handlers/index');
const login = require('./handlers/login');
const signup = require('./handlers/signup');
const moviesList = require('./handlers/moviesList');
const movie = require('./handlers/movie');
const moviesAPI = require('./handlers/moviesAPI');
const movieRating = require('./handlers/movieRating');
const middleware = require('../middlewares/auth');

const error = require('./handlers/error');

module.exports = (app) => {
    app.get('/', index.page),
    app.get('/login', middleware.redirectToHome, login.page),
    app.post('/login', login.loginFormSubmit),
    app.post('/modal-login', login.loginModalSubmit),
    app.get('/logout', login.logoutFormSubmit),
    app.get('/signup', middleware.redirectToHome, signup.page),
    app.post('/signup', signup.signupFormSubmit),
    app.get('/movies/genre/:id', moviesList.getGenreMovies),
    app.get('/movie/:id', movie.page),
    app.get('/api/discover/movie', moviesAPI.getPopularMovies),
    app.get('/movie/:id/rating', movieRating.page),
    app.post('/movie/:id/rating', movieRating.addRating),
    app.get('/*', error.pageNotFound)
}