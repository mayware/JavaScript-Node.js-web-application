const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blog = require('./models/blog');
const Blog = require('./models/blog');

const app = express();

const dburi = `mongodb+srv://tofa993:19932005Vvt@cluster0.yu23f4v.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');

// middleware & static files(e.g images, css files etc)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get("/", (req, res) => {
    res.redirect('/blogs');
});

app.get("/about", (req, res) => {
    res.render('about', { title: 'About Us' });
});



// redirecting the user to the 404 page if there is no match
app.use((req, res) => {
    res.status(404).render('404', { title: '404 Page' });
});

