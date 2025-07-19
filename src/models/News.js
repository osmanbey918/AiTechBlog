import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    mdxContent: {
        type: String,
        required: [true, 'MDX content is required.'],
    },
    meta: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        urlToImage: {
            type: String,
        },
        publishedAt: {
            type: Date,
        },
        source: {
            type: String, required: true
        },
        category: {
            type: String,
            default: 'Technology'
        },
        likes: {
            type: Number,
            default: () => Math.floor(Math.random() * 1000)
        },
        shares: {
            type: Number,
            default: () => Math.floor(Math.random() * 100)
        },
    }
}, { timestamps: true });

export default mongoose.models.News || mongoose.model('News', newsSchema);
