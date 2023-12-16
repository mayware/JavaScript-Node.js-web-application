const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

const username = encodeURIComponent("tofa993");
const password = encodeURIComponent("19932005Vvt");

const dburi = `mongodb+srv://${username}:${password}@cluster0.yu23f4v.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err)
    })


// register view engine
app.set('view engine', 'ejs');

// middleware & static files(e.g images, css files etc)
app.use(express.static('public'));

app.use(morgan('dev'));

app.get("/", (req, res) => {
    const blogs = [
        { title: 'Blog one', snippet: 'snippet generated' },
        { title: 'Blog two', snippet: 'snippet generated' },
        { title: 'Blog three', snippet: 'snippet generated' }
    ];
    res.render('index', { title: 'Home', blogz: blogs });
});

app.get("/about", (req, res) => {
    res.render('about', { title: 'About Us' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404 Page' });
});

