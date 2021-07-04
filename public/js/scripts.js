console.log("Testing")

const getPopularMovies = () => {
    let results;
    $.getJSON(`/api/discover/movie`, (data) => {
        results = data;
        console.log(results)
    })
    return results
}
getPopularMovies();