// app/api/news/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import { NEWS_API_KEY, NEWS_API_BASE_URL } from '@/config/api.config';

// Simple in-memory rate limiting
const rateLimit = {
  windowMs: 60 * 1000,
  maxRequests: 30,
  clients: new Map(),
};

function getRateLimitInfo(ip) {
  const now = Date.now();
  const windowStart = now - rateLimit.windowMs;

  // Clean up old entries
  for (const [key, value] of rateLimit.clients.entries()) {
    if (value.windowStart < windowStart) {
      rateLimit.clients.delete(key);
    }
  }

  if (!rateLimit.clients.has(ip)) {
    rateLimit.clients.set(ip, { windowStart: now, count: 0 });
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

  const articles = data.articles.map((article) => ({
    title: article.title,
    description: article.description,
    urlToImage: article.urlToImage || '/assets/news.svg',
    category: 'technology',
    source: article.source.name,
    publishedAt: article.publishedAt,
    url: article.url,
    likes: 0,
    shares: 0,
  }));

  if (articles.length > 0) {
    await News.insertMany(articles);
  }

  return articles;
}

export async function GET(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateInfo = getRateLimitInfo(ip);

    if (rateInfo.count >= rateLimit.maxRequests) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    rateInfo.count++;

    await connectDB();

    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get('skip')) || 0;
    const limit = parseInt(searchParams.get('limit')) || 8;

    let articles = await News.find({})
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    if (articles.length === 0) {
      await fetchFromNewsAPI(limit);
      articles = await News.find({})
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
    }

    const total = await News.countDocuments({});

    return NextResponse.json({
      articles: articles.map((a) => ({
        id: a._id,
        title: a.title,
        description: a.description,
        image: a.urlToImage,
        category: a.category,
        source: a.source,
        publishedAt: a.publishedAt,
        url: a.url,
        likes: a.likes || 0,
        shares: a.shares || 0,
      })),
      hasMore: total > skip + limit,
    });
  } catch (error) {
    console.error('❌ Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', details: error.message },
      { status: 500 }
    );
  }
}
