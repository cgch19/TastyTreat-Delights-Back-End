const mongoose = require('mongoose');

const YourBlogsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
});

 const Blog = mongoose.model('Blogs', YourBlogsSchema);
 module.exports = Blog
