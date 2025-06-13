import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this blog'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide the content for this blog']
  },
  author: {
    type: String,
    required: [true, 'Please provide an author name'],
    maxlength: [50, 'Author name cannot be more than 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['Technology', 'AI', 'Programming', 'Science', 'Other']
  },
  tags: [String],
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL']
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
