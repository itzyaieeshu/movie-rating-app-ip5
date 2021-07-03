// const page = (req, res) => {
//     res.render('pages/signup')
// }

// module.exports = {
//     page,
// }

const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
    // http://localhost:3000/users/signup
    res.render('signup', {
        title: 'Sign up',
    });
});

//------------Sign Up-------------//

router.post('/signup', async (req, res) => {
    console.log('signing up...');
    const { firstName, surname, email, password, confirmPassword } = req.body;
    console.log(firstName);
    console.log(email);
    if (email && password) {
        // Check if the password and confirm password fields match
        if (password === confirmPassword) {
            // Check if user with the same email is also registered
            console.log('validating...');
            const user = await Users.validateSignUp(email);
            console.log(user);
            // If user is not exist yet
            if (user === undefined) {
                // Store new user into the database
                console.log('storing...');
                let successful = await Users.createNewUser(
                    firstName,
                    surname,
                    email,
                    password
                );
                // Registration completed, redirect user to login
                if (successful) {
                    setAuthToken(successful.insertId, firstName).then(
                        (result) => {
                            const accessToken = result;
                            res.cookie('AuthToken', accessToken);
                            res.redirect('/');
                        }
                    );
                } else {
                    console.log('Failed to store data');
                }
            } else {
                res.render('signup', {
                    title: 'Sign up',
                    firstName,
                    surname,
                    email,
                    password,
                    confirmPassword,
                    message: {
                        message: 'User already registered.',
                        class: 'alert-danger',
                    }
                });
            }
        } else {
            res.render('signup', {
                title: 'Sign up',
                firstName,
                surname,
                email,
                password,
                confirmPassword,
                message: {
                    message: 'Passwords do not match.',
                    class: 'alert-danger',
                }
            });
        }
    }
});