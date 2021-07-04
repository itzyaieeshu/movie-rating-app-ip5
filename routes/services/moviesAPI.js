const axios = require('axios');
const querystring = require('querystring');
axios.defaults.baseURL = 'https://api.themoviedb.org/3'
const api_key = process.env.TMDB_API_KEY;
const api_query = `?api_key=${api_key}`

const popularMovies = (req, res) => {
    axios.get('/discover/movie' + api_query)
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(error);
    })
}

module.exports = {
    popularMovies,
}