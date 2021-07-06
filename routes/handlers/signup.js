const db = require('../../config/database'); //To get access to db

// to bcrypt the password
const bcrypt = require("bcrypt");
const saltRounds = 10;

const page = (req, res) => {
  res.render("pages/signup", {
      title: 'Signup',
      message: req.query.message,
      login: req.session.loggedin
  });
};

const signupFormSubmit = (req, res) => {
  console.log("signup post: " +req.body)
  
  // validate form fields
  let namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i;
  let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{8,32}$/
  let emailPattern = /^[a-zA-Z0-9_.-]+[a-zA-Z0-9_.-]+@+[a-z]{3,5}.+[a-z]{2,4}/g;
  let firstname = String(req.body.firstname);
  let lastname = String(req.body.surname);
  let email = String(req.body.email).toLocaleLowerCase();
  let password = String(req.body.password);
  let confirmPassword = String(req.body.confirmPassword)
  let lnameValid = namePattern.test(lastname);
  let fnameValid = namePattern.test(firstname);
  let passwordValid = passwordPattern.test(password);
  let emailVallid = emailPattern.test(email);

 // console.log(`firstname ${firstname} lastname ${lastname} email ${email}`)

  // check password and confirm password are same
  if (password !== confirmPassword) {
    //console.log(`Password ${password} Confirm ${confirmPassword}`)
    return res.redirect("/signup?message=Passwords%20don't%20match.");
  }

  if (fnameValid && lnameValid && passwordValid && emailVallid) {
    // check whether user/email already exists
    db.oneOrNone("SELECT * FROM users WHERE email = $1;", [req.body.email])
      .then((existingUser) => {
        // console.log(existingUser)
        if (existingUser) {
          //   email already exists
          return res.redirect("/signup?message=User%20already%20exists.");
        } else {
          //   put data into database
          // newUser password hash
          let hashedPassword = bcrypt.hashSync(password, saltRounds);
         // console.log("Pwd and hashed pwd:" + req.body.password + " " +hashedPassword )
            db.any('INSERT INTO users(firstname, lastname, email, password) VALUES ($1, $2, $3, $4);', [firstname, lastname, email, hashedPassword])
            .then(() => {
              res.redirect("/login?successMessage=Signup%20Successful,%20Please%20Login%20to%20Continue");
            })
            .catch((err) => {
              // error id user hasn't been inserted into the db
              res.render("pages/error", {
                message: err.message + err.query,
                login: req.session.loggedin
              });
            });
        }
      })
      .catch((err) => {
        // Failed to check whether user exists or not
        // return res.send(err.message);
        console.log ("err.msg" + err.message)
        console.log("err.query:" + err.query)
        res.render("pages/error", {
          message:err.message + err.query,
          login: req.session.loggedin
        });
      });
  } else {
    return res.redirect("/signup?message=Invalid%20details.%20Please%20give%20valid%20inputs");
  }
};

module.exports = {
  page,
  signupFormSubmit
};
