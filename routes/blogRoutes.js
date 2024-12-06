import express from 'express';
import upload from '../middleware/multerConfig.js';
import {
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';

const router = express.Router();

// Route to create a blog (with document upload)
router.post('/create', upload.single('file'), createBlog);

// Route to read a single blog by ID
router.get('/:id', getBlogById);

// Route to update a blog (with optional document upload)
router.put('/:id', upload.single('file'), updateBlog);

// Route to delete a blog by ID
router.delete('/:id', deleteBlog);

export default router;
