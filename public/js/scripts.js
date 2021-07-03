console.log("Testing")


function getPopularMovies() {
    $.getJSON(`/api/discover/movie`, (data) => {
        console.log(data.results)
    })
}

getPopularMovies();