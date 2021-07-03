// const page = (req, res) => {
//     res.render('pages/login')
// }

// module.exports = {
//     page,
// }

const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    // http://localhost:3000/users/login
    res.render('login', {
        title: 'Login',
    });
});

// ---------Login---------//

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check input is not empty
    if (email && password) {
        // Matching email and password with database
        let user = await Users.getLoginAuth(email, password);
        // If user exist and password is correct
        if (user) {
            //  Create access token and set it in cookies
            setAuthToken(user[0].id, user[0].firstName).then(function (result) {
                const accessToken = result;
                res.cookie('AuthToken', accessToken);
                res.redirect('/');
            });
        } else {
            // If user does not exist or wrong password
            console.log('User not found or password did not match.');
            res.render('login', {
                title: 'Login',
                message: {
                    message: 'Email or password incorrect. Please try again.',
                    class: 'alert-danger'
                },
                email,
                password,
            });
        }
    }
});

//-----------Logout------------//

router.get('/logout', unsetAuthToken, (req, res) => {
    res.redirect('/');
});

module.exports = router;