'use client';
import React, { useEffect, useState } from 'react';
import { fetchNews } from '@/utils/newsService';
import Image from 'next/image';

const NewsSection = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await fetchNews({ category: 'technology', pageSize: 8 });
        if (data.articles) {
          setNewsArticles(data.articles.map((article, index) => ({
            id: index,
            image: article.urlToImage || "/assets/news.svg",
            title: article.title,
            category: "Technology",
            description: article.description,
            source: article.source.name,
            publishedAt: article.publishedAt,
            url: article.url,
            likes: Math.floor(Math.random() * 1000) + "+" ,
            shares: Math.floor(Math.random() * 100) + "",
            altText: article.title
          })));
        }
      } catch (err) {
        setError('Failed to load news');
        console.error('Error loading news:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <section className="w-full g-px py-8 border-t border-solid border-neutral-800 sm:px-6 sm:py-12 md:py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-neutral-400">Loading latest news...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full g-px py-8 border-t border-solid border-neutral-800 sm:px-6 sm:py-12 md:py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-red-400">{error}</div>
        </div>
      </section>
    );
  }

  return (
  <section className="w-full g-px py-8 border-t border-neutral-800 sm:py-12 md:py-16">
    <div className="flex flex-wrap gap-4 ">
      {newsArticles.map((article) => (
        <NewsCard key={article.id} {...article} />
      ))}
    </div>
  </section>
);

};

export const NewsCard = ({
  image,
  title,
  category,
  description,
  source,
  publishedAt,
  url,
  likes,
  shares,
  altText = ""
}) => {
  return (
    <article className="flex flex-col flex-shrink-0 gap-4 max-w-[280px] max-md:max-w-[272px] max-sm:max-w-full h-[420px] rounded-xl overflow-hidden bg-neutral-950">
      <div className="aspect-video overflow-hidden rounded-xl relative">
        <Image
          src={image}
          alt={altText}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.src = '/assets/news.svg';
          }}
        />
      </div>

      <div className="flex flex-col justify-between flex-grow gap-4 pb-4">
        <header className="flex flex-col gap-2">
          <h2 className="text-lg font-bold leading-tight text-white line-clamp-2">
            {title}
          </h2>
          <div className="flex justify-between items-center">
            <p className="text-sm text-neutral-400">
              {category}
            </p>
            <p className="text-xs text-neutral-500">
              {new Date(publishedAt).toLocaleDateString()}
            </p>
          </div>
          <p className="text-sm text-neutral-300 line-clamp-2">{description}</p>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors">
              <Image src="/assets/like.svg" width={20} height={20}/>
              <span className="text-neutral-400">{likes}</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors">
              <span className="text-neutral-400">+</span>
              <Image src="/assets/share.svg" width={20} height={20}/>
            </button>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-4 py-2.5 text-sm rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors"
          >
            <span className="text-neutral-400">Read More</span>
            <span className="text-neutral-400">→</span>
          </a>
        </div>
      </div>
    </article>
  );
};


export default NewsSection;
