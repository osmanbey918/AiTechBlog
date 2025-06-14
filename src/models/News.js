import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    urlToImage: {
        type: String,
        default: "/assets/news.svg"
    },
    publishedAt: {
        type: Date,
        required: true
    },
    source: {
        name: String,
        id: String
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
    fetchedAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
newsSchema.index({ publishedAt: -1 });
newsSchema.index({ title: 1 }, { unique: true });

export default mongoose.models.News || mongoose.model('News', newsSchema);
