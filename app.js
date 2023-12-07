const express = require("express");

// express app
const app = express();

// listen for requests
app.listen(3000);

app.get("/", (req, res) => {
    // {root: __dirname} is made to express look for html files through the project folder
    res.sendFile('./views/index.html', { root: __dirname })
});

app.get("/about", (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname })
});

// redirect from an old page to the new
app.get("/about-us", (req, res) => {
    res.redirect('/about');
})

