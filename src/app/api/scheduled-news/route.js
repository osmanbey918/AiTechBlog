import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import { fetchNews } from '@/utils/newsService';

export async function GET() {
  try {
    const result = await fetchAndStoreNews();
    return NextResponse.json({
      message: 'News fetch and store completed',
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch and store news' },
      { status: 500 }
    );
  }
}

async function fetchAndStoreNews() {
  try {
    console.log('🔄 Starting news fetch:', new Date().toISOString());
    await connectDB();

    const categories = ['technology', 'science'];
    let allArticles = [];

    for (const category of categories) {
      const { articles } = await fetchNews({ category, pageSize: 15 });
      allArticles = [...allArticles, ...articles];
    }

    if (!allArticles.length) {
      throw new Error('No articles fetched');
    }

    console.log(`📥 Fetched ${allArticles.length} articles`);

    const operations = allArticles.map((article) => ({
      updateOne: {
        filter: { url: article.url },
        update: {
          $set: {
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage || '/assets/news.svg',
            publishedAt: new Date(article.publishedAt),
            source: article.source,
            category: article.category || 'General',
            fetchedAt: new Date(),
          },
        },
        upsert: true,
      },
    }));

    const result = await News.bulkWrite(operations);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    await News.deleteMany({ publishedAt: { $lt: sevenDaysAgo } });

    const storedCount = await News.countDocuments();

    console.log(`✅ News updated: ${result.upsertedCount} new, ${result.modifiedCount} updated`);
    console.log(`📊 Total articles in DB: ${storedCount}`);

    return {
      success: true,
      result,
      totalArticles: storedCount,
    };
  } catch (error) {
    console.error('❌ Error during news fetch:', error);
    throw error;
  }
}
