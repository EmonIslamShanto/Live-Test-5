import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Blog routes
app.use('/api/blogs', blogRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
