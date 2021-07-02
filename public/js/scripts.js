console.log("Testing")

const api_key = 'adbb4f7a391daade032a6f2b704fcf8c'
const tmdb_base_url = 'https://api.themoviedb.org/3'
const api_query = `?api_key=${api_key}`

function getPopularMovies() {
    $.getJSON(`${tmdb_base_url}/discover/movie${api_query}`, function(data) {
        console.log(data.results)
    })
}

getPopularMovies();