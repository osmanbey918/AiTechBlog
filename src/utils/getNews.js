// utils/getNews.ts

export async function getNews(skip = 0, limit = 12) {
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';

    try {
        const res = await fetch(`${baseUrl}/api/news?skip=${skip}&limit=${limit}`, {
            next: { revalidate: 3600 }, // 1 hour caching (ISR)
        });

        if (!res.ok) throw new Error('Failed to fetch news');

        const data = await res.json();
        const articles = Array.isArray(data.articles) ? data.articles : [];

        return {
            articles,
            hasMore: articles.length === limit, // Optional: improves paging logic
        };

    } catch (error) {
        console.error('Error in getNews:', error);
        return {
            articles: [],
            hasMore: false,
        };
    }
}
