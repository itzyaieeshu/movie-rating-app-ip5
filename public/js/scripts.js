const rateLoginModal = document.getElementById('rateLoginModal');
const rateMovieModal = document.getElementById('rateMovieModal');
    const openModal = (modal) => {
      modal.style.display = 'block';
    };
    closeModal = (modal) => {
      modal.style.display = 'none';
    };
const getPopularMovies = () => {
    let results;
    $.getJSON(`/api/discover/movie`, (data) => {
        results = data;
        console.log(results)
    })
    return results
}
getPopularMovies();