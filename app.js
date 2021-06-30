const express = require('express');
const session = require('express-session');

// Importing dotenv package
require('dotenv').config();

const app = express();

// Importing database config
const db = require('./config/database');

// Importing public folder
app.use(express.static('public'));

const port = process.env.PORT || 3000;

// Defining cookies session 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Defining cookies session 
app.use(session({
    cookie: {
        maxAge: 1000 * 60 * 10, 
    },
    name: 'movie_rating_app_sid',
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
}))

// Importing movie app routes
require('./routes/routes')(app);

// Code for server
app.listen(port, () => {
    console.log(`Movie rating app listening at http://localhost:${port}`);
});