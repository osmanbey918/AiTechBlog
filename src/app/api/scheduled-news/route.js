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
        console.log('Starting news fetch and store process...');
        await connectDB();
        
        // Fetch news from multiple categories to ensure variety
        const categories = ['technology', 'science'];
        let allArticles = [];
        
        for (const category of categories) {
            const { articles } = await fetchNews({ 
                category, 
                pageSize: 15 // Fetch articles per category
            });
            allArticles = [...allArticles, ...articles];
        }        if (!allArticles || allArticles.length === 0) {
            throw new Error('No articles fetched from API');
        }

        console.log(`Fetched ${allArticles.length} articles, preparing to store...`);

        // Process and store each article
        const operations = allArticles.map(article => ({
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

        // Perform bulk write operation        // Execute bulk operation
        const result = await News.bulkWrite(operations);
        
        // Clean up old articles (keep last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        await News.deleteMany({
            publishedAt: { $lt: sevenDaysAgo }
        });

        console.log(`News update completed: ${result.upsertedCount} new articles, ${result.modifiedCount} updated`);
        
        // Verify stored articles
        const storedCount = await News.countDocuments({});
        console.log(`Total articles in database: ${storedCount}`);

        return { 
            success: true, 
            result,
            totalArticles: storedCount 
        };
    } catch (error) {
        console.error('Error in fetchAndStoreNews:', error);
        throw error;
    }
}

// API route handler for manual triggers and initial fetch
export async function GET(request) {
    try {
        const result = await fetchAndStoreNews();
        return NextResponse.json({ 
            message: 'News fetch and store completed',
            ...result
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch and store news' }, 
            { status: 500 }
        );
    }
}
