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


// Routes ////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.redirect('/blogs');
});

app.get("/about", (req, res) => {
    res.render('about', { title: 'About Us' });
});

app.get("/blogs", (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // sorting makes the newest blog to appear at the top
        .then((data) => {
            res.render('index', { title: 'All Blogs here', blogs: data })
        })
        .catch((err) => {
            console.log(err)
        })
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body); // here "body" corresponds to an entire object including title, snippet and body
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id // params.id refers to this /blogs/:id
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404 Page' });
});
// Routes ////////////////////////////////////////////////////////////////////////////

