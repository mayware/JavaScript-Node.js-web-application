const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');


// Blog routes

router.get('/create', blogController.blog_create_get)

// Displaying the home page
router.get("/", blogController.blog_index);

// Saving input data from the actual form to the server
router.post('/', blogController.blog_create_post)

// Navigating to the selected blog
router.get('/:id', blogController.blog_details);

// Deleting the blog
router.delete('/:id', blogController.blog_delete)

module.exports = router;