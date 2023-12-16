const { MongoBulkWriteError } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// creating a structure for the blog document
const blogSchema = new Schema({
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    body: { type: String, required: true }
}, { timestamps: true });
// timestamps auto-assigns the time when the blog has been created

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;