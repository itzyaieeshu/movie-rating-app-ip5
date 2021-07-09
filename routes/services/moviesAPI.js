const axios = require('axios');
const querystring = require('querystring');
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const api_key = process.env.TMDB_API_KEY;
const api_query = `?api_key=${api_key}`;
const lang = '&language=en-US';
const popularity = '&sort_by=popularity.desc';

const popularMovies = () => axios.get('/discover/movie' + api_query);

const movie = (id) => axios.get('/movie/' + id + api_query);

const movieCredits = (id) => axios.get('/movie/' + id + '/credits' + api_query + lang);

const genre = (genreName) => axios.get('/discover/movie' + api_query + popularity + '&with_genres=' + genreName);

module.exports = {
    popularMovies,
    movie,
    movieCredits,
    genre,
}