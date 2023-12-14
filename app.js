const express = require('express');
const morgan = require('morgan');
const app = express();

// register view engine
app.set('view engine', 'ejs');
app.listen(3000);

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

