import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import { NEWS_API_KEY, NEWS_API_BASE_URL } from '@/config/api.config';

// Simple rate limiting implementation
const rateLimit = {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30, // max requests per window
    clients: new Map()
};

function getRateLimitInfo(ip) {
    const now = Date.now();
    const windowStart = now - rateLimit.windowMs;
    
    // Clean up old entries
    rateLimit.clients.forEach((data, key) => {
        if (data.windowStart < windowStart) {
            rateLimit.clients.delete(key);
        }
    });

    if (!rateLimit.clients.has(ip)) {
        rateLimit.clients.set(ip, {
            windowStart: now,
            count: 0
        });
    }

    const client = rateLimit.clients.get(ip);
    if (client.windowStart < windowStart) {
        client.windowStart = now;
        client.count = 0;
    }

    return client;
}

async function fetchFromNewsAPI(limit) {
    const response = await fetch(
        `${NEWS_API_BASE_URL}/top-headlines?country=us&category=technology&pageSize=${limit}&apiKey=${NEWS_API_KEY}`
    );
    
    if (!response.ok) {
        throw new Error(`News API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform and save the articles to database
    const articles = data.articles.map(article => ({
        title: article.title,
        description: article.description,
        urlToImage: article.urlToImage,
        category: 'technology',
        source: article.source.name,
        publishedAt: article.publishedAt,
        url: article.url,
        likes: 0,
        shares: 0
    }));

    // Save to database if we have articles
    if (articles.length > 0) {
        await News.insertMany(articles);
    }

    return articles;
}

export async function GET(request) {
    try {
        // Apply rate limiting
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const rateLimitInfo = getRateLimitInfo(ip);
        
        if (rateLimitInfo.count >= rateLimit.maxRequests) {
            return NextResponse.json(
                { error: 'Too many requests' },
                { status: 429 }
            );
        }
        rateLimitInfo.count++;

        await connectDB();
        
        // Get query parameters
        const { searchParams } = new URL(request.url);
        const skip = parseInt(searchParams.get('skip')) || 0;
        const limit = parseInt(searchParams.get('limit')) || 8;

        // First, try to fetch from database
        let articles = await News.find({})
            .sort({ publishedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(); // Use lean() for better performance

        // If no articles in database, fetch from API
        if (articles.length === 0) {
            console.log('No articles in database, fetching from API...');
            const apiArticles = await fetchFromNewsAPI(limit);
            
            // Re-fetch from database after saving API results
            articles = await News.find({})
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();
        }

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
                likes: article.likes || 0,
                shares: article.shares || 0
            })),
            hasMore: total > (skip + limit)
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json(
            { error: 'Failed to fetch news', details: error.message },
            { status: 500 }
        );
    }
}
