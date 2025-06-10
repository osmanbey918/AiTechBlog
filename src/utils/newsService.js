import { NEWS_API_KEY, NEWS_API_BASE_URL } from '@/config/api.config';

export const fetchNews = async ({ category, pageSize = 10, page = 1 }) => {
    try {
        const response = await fetch(
            `${NEWS_API_BASE_URL}/top-headlines?country=pk&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
        return { articles: [], totalResults: 0 };
    }
};

export const searchNews = async ({ query, pageSize = 10, page = 1 }) => {
    try {
        const response = await fetch(
            `${NEWS_API_BASE_URL}/everything?q=${query}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`,
            { next: { revalidate: 3600 } }
        );

        if (!response.ok) {
            throw new Error('Failed to search news');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching news:', error);
        return { articles: [], totalResults: 0 };
    }
};
