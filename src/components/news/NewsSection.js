'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import NewsHead from './NewsHead';

// Cache implementation
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const NewsSection = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const initialPageSize = 12; // Increased to get enough articles for both carousel and grid

  // Debounced fetch implementation
  const debouncedFetch = useCallback((url) => {
    const cacheKey = url;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return Promise.resolve(cachedData.data);
    }

    // Add a small delay to prevent rapid successive calls
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch news');
          }

          // Cache the successful response
          cache.set(cacheKey, {
            data,
            timestamp: Date.now()
          });

          resolve(data);
        } catch (error) {
          console.error('Error fetching news:', error);
          throw error;
        }
      }, 300); // 300ms delay
    });
  }, []);

  const loadNews = useCallback(async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      
      // Calculate pagination parameters
      const skip = isLoadMore ? newsArticles.length : 0;
      const limit = isLoadMore ? 4 : initialPageSize;
      
      const data = await debouncedFetch(`/api/news?skip=${skip}&limit=${limit}`);

      if (data.articles) {
        const newArticles = data.articles;
        setNewsArticles(prev => isLoadMore ? [...prev, ...newArticles] : newArticles);
        setHasMore(data.hasMore);
        if (isLoadMore) {
          setPage(prev => prev + 1);
        }
      }
    } catch (err) {
      setError(isLoadMore ? 'Failed to load more news' : 'Failed to load news');
      console.error('Error loading news:', err);
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  }, [newsArticles.length, debouncedFetch]);

  // Use useEffect with proper dependencies
  useEffect(() => {
    loadNews();
  }, [loadNews]);

  if (loading) {
    return (
      <section className="w-full g-px py-8 border-t border-neutral-800 sm:py-12 md:py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-neutral-400">Loading latest news...</div>
        </div>
      </section>
    );
  }

  if (error && !newsArticles.length) {
    return (
      <section className="w-full g-px py-8 border-t border-neutral-800 sm:py-12 md:py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-red-400">{error}</div>
        </div>
      </section>
    );
  }

  // Extract first 4 articles for the carousel
  const carouselArticles = newsArticles.slice(0, 4);
  const gridArticles = newsArticles.slice(4);

  return (
    <>
      <NewsHead articles={carouselArticles} />
      <section className="w-full g-px py-8 border-t border-neutral-800 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gridArticles.map((article) => (
            <NewsCard key={article.id} {...article} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => loadNews(true)}
              disabled={loadingMore}
              className="px-6 py-3 bg-neutral-900 text-white rounded-lg border border-neutral-800 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}

        {error && newsArticles.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}
      </section>
    </>
  );
};


export const NewsCard = ({
  image,
  title,
  category,
  description,
  publishedAt,
  url,
  likes = 0,
  shares = 0,
  altText = "News Image"
}) => {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <article className="flex flex-col bg-neutral-950 min-w-[14rem] border border-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-video">
        <Image
          src={imgSrc}
          alt={altText}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          onError={() => setImgSrc('/assets/news.svg')}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-col justify-between flex-grow p-4 gap-3">
        <header className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-white line-clamp-2">{title}</h2>
          <div className="flex justify-between items-center text-sm text-neutral-400">
            <span>{category}</span>
            <span className="text-xs text-neutral-500">
              {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(publishedAt))}
            </span>
          </div>
          <p className="text-sm text-neutral-300 line-clamp-3">{description}</p>
        </header>

        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-3">
            <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition">
              <Image src="/assets/like.svg" width={18} height={18} alt="Like"/>
              <span className="text-neutral-400 text-sm">{likes}</span>
            </button>

            <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition">
              <Image src="/assets/share.svg" width={18} height={18} alt="Share"/>
              <span className="text-neutral-400 text-sm">{shares}</span>
            </button>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-4 py-1.5 text-sm rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition"
          >
            <span className="text-neutral-400">Read</span>
              <Image src="/assets/arrow-up-right.svg" width={12} height={6} alt="Share"/>

          </a>
        </div>
      </div>
    </article>
  );
};



export default NewsSection;
