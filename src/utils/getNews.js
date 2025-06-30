'use server'

// const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
// let cachedNews = null;
// let lastFetchTime = 0;

export async function getNews(skip = 0, limit = 12) {
    const now = Date.now();

    // // Return cached data if it's less than 1 hour old
    // if (cachedNews && (now - lastFetchTime < CACHE_DURATION)) {
    //     const start = skip;
    //     const end = skip + limit;
    //     return {
    //         articles: cachedNews.slice(start, end),
    //         hasMore: end < cachedNews.length
    //     };
    // }
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';


    try {
        const res = await fetch(`${baseUrl}/api/news?skip=${skip}&limit=${limit}`);
        
        if (!res.ok) {
            throw new Error('Failed to fetch news');
        }
        
        const data = await res.json();
        
        // // Cache the full result
        // cachedNews = data.articles;
        // lastFetchTime = now;
        
        
        const articles = Array.isArray(data.articles) ? data.articles : [];
        console.log(articles);
        return { articles };
         
    } catch (error) {
        console.error('Error fetching news:', error);
        return { articles: [], hasMore: false };
    }
}
