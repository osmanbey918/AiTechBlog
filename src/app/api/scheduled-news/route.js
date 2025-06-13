import { NextResponse } from 'next/server';
import cron from 'node-cron';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import { fetchNews } from '@/utils/newsService';

// Schedule the task to run at 12 AM and 12 PM
cron.schedule('0 0,12 * * *', async () => {
    console.log('Running scheduled news fetch:', new Date().toISOString());
    await fetchAndStoreNews();
});

async function fetchAndStoreNews() {
    try {
        await connectDB();
        
        // Fetch news from the API
        const { articles } = await fetchNews({ 
            category: 'technology', 
            pageSize: 20 // Fetch more articles to ensure fresh content
        });

        if (!articles || articles.length === 0) {
            throw new Error('No articles fetched from API');
        }

        // Process and store each article
        const operations = articles.map(article => ({
            updateOne: {
                filter: { url: article.url }, // Use URL as unique identifier
                update: {
                    $set: {
                        title: article.title,
                        description: article.description,
                        url: article.url,
                        urlToImage: article.urlToImage || "/assets/news.svg",
                        publishedAt: new Date(article.publishedAt),
                        source: article.source,
                        category: 'Technology',
                        fetchedAt: new Date()
                    }
                },
                upsert: true // Create if doesn't exist
            }
        }));

        // Perform bulk write operation
        const result = await News.bulkWrite(operations);
        console.log(`News update completed: ${result.upsertedCount} new articles, ${result.modifiedCount} updated`);

        return { success: true, result };
    } catch (error) {
        console.error('Error in fetchAndStoreNews:', error);
        throw error;
    }
}

// API route handler for manual triggers and initial fetch
export async function GET() {
    try {
        await fetchAndStoreNews();
        return NextResponse.json({ message: 'News fetch and store completed' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch and store news' }, 
            { status: 500 }
        );
    }
}
