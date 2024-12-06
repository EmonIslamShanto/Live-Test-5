import Blog from '../models/Blog.js';
import fs from 'fs';
import path from 'path';

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, short_des, des } = req.body;

    // Check if a file was uploaded
    const file = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !short_des || !des || !file) {
      return res.status(400).json({ message: 'All fields are required, including a file' });
    }

    const blog = new Blog({ title, short_des, des, file });
    await blog.save();

    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Read a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a blog by ID
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, short_des, des } = req.body;

    // Check if a new file was uploaded
    const file = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = { title, short_des, des };
    if (file) updatedData.file = file;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // If a new file is uploaded, delete the old file
    if (file && blog.file) {
      const filePath = path.join(process.cwd(), blog.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({ message: 'Blog updated successfully', updatedBlog });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a blog by ID
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Delete the attached file
    if (blog.file) {
      const filePath = path.join(process.cwd(), blog.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
