const Blog = require('../models/blog');



// Only routes which include /blogs

// blog_index for retrieving all the blogs
const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // sorting makes the newest blog to appear at the top
        .then((data) => {
            res.render('index', { title: 'All Blogs here', blogs: data })
        })
        .catch((err) => {
            console.log(err)
        })
}

// to retrieve the selected blog
const blog_details = (req, res) => {
    const id = req.params.id // params.id refers to this /blogs/:id
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => {
            res.render('404', { title: 'Blog not found' });
        })
}

// to retrieve the form page itself
const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new blog' });
}

// to save form data to the server
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body); // here "body" corresponds to an entire object including title, snippet and body

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
}


// to delete data from the server
const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
            // here we just send text message (json object) to the frontend, which corresponds to the url where we want to be redirected to
            // and in frontend <script></script> code we just use (window.location.href = redirect)
        })
        .catch((err) => {
            console.log(err)
        })
}


// exporting functions
module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}