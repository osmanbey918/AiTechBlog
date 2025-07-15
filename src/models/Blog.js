import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  mdxContent: {
    type: String,
    required: [true, 'MDX content is required.'],
  },
  jsonLd: {
    type: Object,
    required: [true, 'JSON-LD is required.'],
  },
  meta: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    keywords: { type: String },
    imageUrl: { type: String },
  },
}, { timestamps: true });

export default mongoose.models.blog || mongoose.model('blog', blogSchema);