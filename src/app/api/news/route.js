import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';

export async function GET(request) {
    try {
        await connectDB();
        
        // Get query parameters
        const { searchParams } = new URL(request.url);
        const skip = parseInt(searchParams.get('skip')) || 0;
        const limit = parseInt(searchParams.get('limit')) || 8;

        // Fetch news articles with pagination
        const articles = await News.find({})
            .sort({ publishedAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get total count for pagination
        const total = await News.countDocuments({});

        return NextResponse.json({
            articles: articles.map(article => ({
                id: article._id,
                title: article.title,
                description: article.description,
                image: article.urlToImage,
                category: article.category,
                source: article.source,
                publishedAt: article.publishedAt,
                url: article.url,
                likes: article.likes,
                shares: article.shares
            })),
            hasMore: total > (skip + limit)
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json(
            { error: 'Failed to fetch news' },
            { status: 500 }
        );
    }
}
