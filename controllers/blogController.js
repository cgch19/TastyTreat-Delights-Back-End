const Blog = require('../models/Blog');

// Create a new blog
const createBlog = async (req, res) => {
    try {
        console.log('createBlog called by user:', req.user.id);
        const { title, description } = req.body;
        const newBlog = new Blog({
            title,
            description,
            User: req.user.id 
        });
        await newBlog.save();
        console.log('Saved created blog:', newBlog);
        res.status(201).json(newBlog);
    } catch (err) {
        console.error('Error creating blog:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
        console.log('getAllBlogs called by user:', req.user.id);
        const blogs = await Blog.find().populate('User', 'role'); 
        console.log('Found blogs:', blogs);
        res.status(200).json({data: blogs});
    } catch (err) {
        console.error('Error finding blogs:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};


// Update a blog
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            console.error('Error updating blog: ID is undefined');
            return res.status(400).json({ error: 'ID is undefined' });
        }
        console.log('Blog ID to update:', id);
        console.log('Request body:', req.body);

        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBlog) {
            console.log('Blog not found');
            return res.status(404).json({ message: 'Blog not found' });
        }
        console.log('Updated blog:', updatedBlog);
        res.status(200).json(updatedBlog);
    } catch (err) {
        console.error('Error updating blog:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a blog
const deleteBlog = async (req, res) => {
    try {
        console.log('deleteBlog called by user:', req.user.id);
        const { id } = req.params;
        console.log('Blog ID to delete:', id);

        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            console.log('Blog not found');
            return res.status(404).json({ message: 'Blog not found' });
        }
        console.log('Deleted blog:', deletedBlog);
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.error('Error deleting blog:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog
};
