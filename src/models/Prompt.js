import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
  mdxContent: {
    type: String,
    required: [true, 'MDX content is required.'],
  },
  meta: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    keywords: { type: String },
    imageUrl: { type: String },
    category: { type: String },
    rating: { type: String },
    uses: { type: String, required: true },
    publishedAt: { type: String, required: true }

  },
}, { timestamps: true });

export default mongoose.models.prompt || mongoose.model('prompt', promptSchema);  