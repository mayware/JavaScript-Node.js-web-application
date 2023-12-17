app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
})

// Main Routes ////////////////////////////////////////////////////////////////////////////


// This is resposible for the displaying the home page, because of line: 24 where we redirect user to the /blogs
app.get("/blogs", (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // sorting makes the newest blog to appear at the top
        .then((data) => {
            res.render('index', { title: 'All Blogs here', blogs: data })
        })
        .catch((err) => {
            console.log(err)
        })
});

// POST request
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

// responsible for navigating to the selected blog
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

// responsible for deleting the blog
app.delete('/blogs/:id', (req, res) => {
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
})