const rateLoginModal = document.getElementById('rateLoginModal');
const rateMovieModal = document.getElementById('rateMovieModal');
const rateThanksModal = document.getElementById('rateThanksModal');
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
  console.log(window.location.href)
  $.ajax({
      url: window.location.href + '/rating',
      type: "POST",
      dataType: "html",
      data: $('#ratingModalForm').serialize(),
      contentType: 'application/x-www-form-urlencoded',
      rating: $(".rating:checked").val(),
      beforeSend: function(xhr) {},
      success: function(data) {  
        console.log(data)
        if(data === 'success') {
          closeModal(rateMovieModal);            
          openModal(rateThanksModal);
        } else if(data === 'alreadyrated') {
          $( "#error" ).append( '<p class="error">You have already rated this movie.</p>' );
        } else if(data === 'insertrating') {
          $( "#error" ).append( '<p class="error">Please insert valid rating.</p>' );
        } else {
          $( "#error" ).append( '<p class="error">Something went wrong, please try again later.</p>' );
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // alert('error ' + textStatus + " " + errorThrown);
        console.log('Error', textStatus, errorThrown)
    }
  });

});