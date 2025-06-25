"use client"
import { useCallback, useEffect, useState } from 'react';

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const useNewsArticles = (initialPageSize = 12) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debouncedFetch = useCallback((url) => {
    const cacheKey = url;
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return Promise.resolve(cached.data);
    }

    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          const res = await fetch(url);
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Fetch failed');

          cache.set(cacheKey, { data, timestamp: Date.now() });
          resolve(data);
        } catch (err) {
          throw err;
        }
      }, 300); // debounce delay
    });
  }, []);

  const loadNews = useCallback(async (isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);

      const skip = isLoadMore ? newsArticles.length : 0;
      const limit = isLoadMore ? 4 : initialPageSize;

      const data = await debouncedFetch(`/api/news?skip=${skip}&limit=${limit}`);

      if (data.articles) {
        setNewsArticles(prev => isLoadMore ? [...prev, ...data.articles] : data.articles);
        setHasMore(data.hasMore);
        if (isLoadMore) setPage(p => p + 1);
      }
    } catch (err) {
      setError(isLoadMore ? 'Failed to load more news' : 'Failed to load news');
    } finally {
      isLoadMore ? setLoadingMore(false) : setLoading(false);
    }
  }, [newsArticles.length, debouncedFetch]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return {
    newsArticles,
    loading,
    loadingMore,
    error,
    hasMore,
    loadNews
  };
};

export default useNewsArticles;
