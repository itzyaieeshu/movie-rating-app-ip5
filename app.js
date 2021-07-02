const express = require('express');
const session = require('express-session');

// Importing handlebar package
const expressHandlebars = require('express-handlebars');

// Importing dotenv package
require('dotenv').config();

const app = express();

// Importing database config
const db = require('./config/database');

// Importing public folder
app.use(express.static('public'));

// Defining handlebars
app.engine('handlebars', expressHandlebars ({
        defaultLayout:'main', 
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials/'
    })
);
app.set('view engine', 'handlebars');

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
    console.log(`Movie rating app listening at http://localhost:${port}/`);
});
