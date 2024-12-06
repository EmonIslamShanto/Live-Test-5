import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    short_des: { type: String, required: true, maxlength: 300 },
    des: { type: String, required: true },
    file: { type: String, required: true }, // Path to the uploaded file
  },
  {
    versionKey: false,
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Blog = mongoose.model('Blog', DataSchema);
export default Blog;
