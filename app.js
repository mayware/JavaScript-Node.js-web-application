const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blog = require('./models/blog');
const app = express();

const username = encodeURIComponent("tofa993");
const password = encodeURIComponent("19932005Vvt");

const dburi = `mongodb+srv://tofa993:19932005Vvt@cluster0.yu23f4v.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');

// middleware & static files(e.g images, css files etc)
app.use(express.static('public'));

app.use(morgan('dev'));

// sandbox routes for just testing

app.get('/add-blog', (req, res) => {
    const newBlog = new blog({
        title: 'New blog 2',
        snippet: 'About my new blog',
        body: 'Body text of the blog'
    });

    newBlog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});


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

