'use client';
import React from 'react';
import Image from 'next/image';
import useNewsArticles from '../hooks/useNewsArticles';
import NewsCard from './NewsCard';
import NewsHead from './NewsHead';

const NewsSection = () => {
  const {
    newsArticles,
    loading,
    loadingMore,
    error,
    hasMore,
    loadNews
  } = useNewsArticles();

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

  const carouselArticles = newsArticles.slice(0, 4);
  const gridArticles = newsArticles.slice(4);

  return (
    <>
      <NewsHead articles={carouselArticles} />
      <h2 className="flex mt-20 w-full border-b font-bold text-6xl border-neutral-800 g-px">
        Trending
        <Image src="/assets/trending-up-fill.svg" width={80} height={80} alt="arrow" />
      </h2>
      <section className="w-full g-px py-8 border-t border-neutral-800 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

export default NewsSection;
