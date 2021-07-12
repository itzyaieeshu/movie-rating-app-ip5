const moviesAPI = require("../services/moviesAPI");
const db = require('../../config/database')

const page = (req, res) => {
        res.render("pages/movie-rating", {
        title: "Movie Rating",
        session: !req.session.userId ? false : true,
        sessionUser: !req.session.userId ? "" : req.session.firstname,
        id: req.params.id,
        rating: req.params.rating,
        message: req.query.message,
        successMessage: req.query.successMessage,
      })
};

const addRating = (req, res) => {
        // Check if user is logged in or not
    if(!req.session.userId) {
        res.redirect('/login?message=Please%20login%20to%20rate%20the%20movie!')
    }

    //If user is logged in , check if the user already gave ratings to this movie or not
    else {
        db.oneOrNone('SELECT * FROM ratings WHERE user_id = $1 AND movie_id = $2', [req.session.userId, req.params.id])
        .then((ratingExist) => {
          // if rating exists for this movie, return error
           if(ratingExist) {
               return res.redirect(`/movie/${req.params.id}?message=You%20already%20rated%20to%20this%20movie!`)
            }   
            
            // User is logged in and ratings to this movie doesn't exist
            else {
                //Check if user entered rating or not
                if(req.body.rating === '') {
                    res.redirect(`/movie/${req.params.id}?message=Please%20insert%20rating!`)
                  }
                
                // Enter user rating into the database
                db.none('INSERT INTO ratings(movie_id, rating, user_id) VALUES ($1, $2, $3);', [req.params.id, Number(req.body.rating), req.session.userId])
                .then(() => {
                    res.redirect(`/movie/${req.params.id}?successMessage=Thank%20You%20for%20rating!`)
                })
                //Query to insert data into the database failed
                .catch(err => {
                    res.render("pages/error", {
                        message: err.message + " " + err.query,
                    });
                }) 
            }
            
        })

        //Query to check User rating failed
        .catch(err => {
            res.render("pages/error", {
                message:err.message + " " + err.query,
            });
        }) 
    }
}

module.exports = {
  page,
  addRating
};
