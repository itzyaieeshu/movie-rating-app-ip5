const rateLoginModal = document.getElementById('rateLoginModal');
const rateMovieModal = document.getElementById('rateMovieModal');
const rateThanksModal = document.getElementById('rateThanksModal');
const searchBox = document.getElementById('movies-search-box');

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
const searchMovies = (key) => {
  $.getJSON(`/api/search/movie/` + key, (data) => {
      $("#search-results").empty()
    data.results.forEach(movie => {
          $( "#search-results" ).append(
            `<div class="col-md-4 pb-4">
            <a href="/movie/${movie.id}">
                <div class="card bg-cs-2 shadow-sm p-3">
                    <div class="col-sm-12 row">
                        <div class="col-sm-4">
                            <img
                                src="https://image.tmdb.org/t/p/original/${movie.poster_path}"
                                class="card-img-top" alt="...">
                        </div>
                        <div class="col-sm-8 text-light">
                            <h4>${movie.title}</h4>
                        </div>
                    </div>
                </div>
            </a>
        </div>`
          );
    });
      return data
  })
}
getPopularMovies();


document.addEventListener('DOMContentLoaded', () => { 
  searchBox.oninput = () => {
    searchMovies(searchBox.value)
    if(!searchBox.value) {
      $("#search-results").empty()
    }
  };
});

$('#modalLogin').on('click', function(e) {
  e.preventDefault();
  $.ajax({
      url: '/modal-login',
      type: "POST",
      dataType: "html",
      data: $('#loginModalForm').serialize(),
      contentType: 'application/x-www-form-urlencoded',
      email: $("#userEmail").val(),
      password: $("#userPassword").val(),
      beforeSend: function(xhr) {},
      success: function(data) {  
        if (data === 'success') {
          closeModal(rateLoginModal);            
          openModal(rateMovieModal);
        } else {
          $("#error").empty()
          $( "#error" ).append( '<p class="error">Login Unsuccessfull</p>' );
        }         
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // alert('error ' + textStatus + " " + errorThrown);
        console.log('Error', textStatus, errorThrown)
    }
  });

});

$('#modalRating').on('click', function(e) {
  e.preventDefault();
  $.ajax({
      url: window.location.href + '/rating',
      type: "POST",
      dataType: "html",
      data: $('#ratingModalForm').serialize(),
      contentType: 'application/x-www-form-urlencoded',
      rating: $(".rating:checked").val(),
      beforeSend: function(xhr) {},
      success: function(data) {  
        if (data === 'success') {
          closeModal(rateMovieModal);            
          openModal(rateThanksModal);
        } else if (data === 'alreadyrated') {
          $("#rating-error").empty()
          $( "#rating-error" ).append( '<p class="error">You have already rated this movie</p>' );
        } else if (data === 'insertrating') {
          $("#rating-error").empty()
          $( "#rating-error" ).append( '<p class="error">Please insert valid rating</p>' );
        } else {
          $("#rating-error").empty()
          $( "#rating-error" ).append( '<p class="error">Something went wrong please try again later</p>' );
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // alert('error ' + textStatus + " " + errorThrown);
        console.log('Error', textStatus, errorThrown)
    }
  });

});