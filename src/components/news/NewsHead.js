"use client"
import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';

const StatBadge = ({ count }) => {
  return (
    <div className="flex gap-1 justify-center items-center px-3.5 py-1.5 border border-solid bg-zinc-900 border-neutral-800 rounded-[100px]">
      <span className="text-neutral-400">+</span>
      <span className="text-sm tracking-tight leading-5 text-neutral-400">
        {count}
      </span>
    </div>
  );
};

const ArticleImage = ({ src, alt, className = "" }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Image
      src={imgError ? "/assets/news.svg" : src}
      alt={alt}
      onError={() => setImgError(true)}
      width={515}
      height={325}
      className={`object-cover rounded-xl h-[325px] w-[515px] max-md:w-full max-md:h-auto max-md:max-w-[515px] transition-transform duration-500 ${className}`}
    />
  );
};

const ArticleMetadata = ({ category, date, author }) => {
  return (
    <section className="flex gap-8 items-start w-full max-md:flex-wrap max-md:gap-5 max-sm:flex-col max-sm:gap-4">
      <div className="flex flex-col gap-0.5 items-start">
        <h4 className="text-base tracking-tight leading-6 text-neutral-400">
          Category
        </h4>
        <p className="text-base tracking-tight leading-6 text-white">
          {category}
        </p>
      </div>
      <div className="flex flex-col gap-0.5 items-start">
        <h4 className="text-base tracking-tight leading-6 text-neutral-400">
          Publication Date
        </h4>
        <time className="text-base tracking-tight leading-6 text-white">
          {date}
        </time>
      </div>
      <div className="flex flex-col gap-0.5 items-start">
        <h4 className="text-base tracking-tight leading-6 text-neutral-400">
          Author
        </h4>
        <p className="text-base tracking-tight leading-6 text-white">
          {author}
        </p>
      </div>
    </section>
  );
};

const ArticleStats = ({ likes, shares }) => {
  return (
    <section className="flex justify-between items-start w-full max-sm:flex-col max-sm:gap-4 max-sm:">

      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-3">
          <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition">
            <Image src="/assets/like.svg" width={18} height={18} alt="Like" />
            <span className="text-neutral-400 text-sm">{likes}</span>
          </button>

          <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition">
            <Image src="/assets/share.svg" width={18} height={18} alt="Share" />
            <span className="text-neutral-400 text-sm">{shares}</span>
          </button>
        </div>
      </div>
      <button className="flex gap-2.5 items-center px-5 py-3.5 rounded-lg border border-solid bg-neutral-900 border-neutral-800 max-sm:justify-center">
        <span className="text-sm tracking-tight leading-5 text-neutral-400">
          Read More
        </span>
      </button>
    </section>
  );
};

const ArticleContent = ({
  title,
  description,
  category,
  date,
  author,
  likes,
  shares
}) => {
  return (
    <div className="flex flex-col flex-1 gap-10 items-start max-md:w-full">
      <header className="flex flex-col gap-3.5 items-start w-full">
        <h2 className="w-full text-2xl font-bold tracking-tighter leading-9 text-white max-sm:text-xl">
          {title}
        </h2>
        <p className="w-full text-lg tracking-tight leading-7 text-neutral-400 max-sm:text-base">
          {description}
        </p>
      </header>

      <ArticleMetadata
        category={category}
        date={date}
        author={author}
      />

      {/* <ArticleStats
        likes={likes}
        shares={shares}
      /> */}
    </div>
  );
};

export const NewsHead = ({ articles = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (articles.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % articles.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [articles.length]);

  if (articles.length === 0) {
    articles = [{
      image: "https://placehold.co/515x325/ff8c42/ff8c42",
      title: "Global Climate Summit Addresses Urgent Climate Action",
      description: "World leaders gathered at the Global Climate Summit to discuss urgent climate action, emissions reductions, and renewable energy targets.",
      category: "Environment",
      publishedAt: "October 10, 2023",
      source: { name: "Jane Smith" },
      likes: "14k",
      shares: "204"
    }];
  }

  const currentArticle = articles[currentIndex];

  return (<article
    className="box-border flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center g-px py-8 sm:py-12 md:py-16 w-full border-t border-solid border-t-neutral-800 relative"
  >
    <div className={`w-full md:w-1/2 overflow-hidden transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <ArticleImage
        src={currentArticle.image}
        alt={currentArticle.title}
        className="hover:scale-105"
      />
    </div>

    <div className={`w-full md:w-1/2 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
      <ArticleContent
        title={currentArticle.title}
        description={currentArticle.description}
        category={currentArticle.category}
        date={new Date(currentArticle.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
        author={currentArticle.source.name}
        likes={currentArticle.likes}
        shares={currentArticle.shares}
      />
    </div>

    {articles.length > 1 && (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {articles.map((_, index) => (
          <button
            key={index}
            className={`h-2 transition-all duration-300 rounded-full ${index === currentIndex
              ? 'w-8 bg-white'
              : 'w-2 bg-neutral-600 hover:bg-neutral-500'
              }`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    )}
  </article>
  );
};

export default NewsHead;
