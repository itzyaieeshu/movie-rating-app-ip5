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