"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// 📷 Image with fallback
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

const ArticleMetadata = ({ category, date, author }) => (
  <section className="flex gap-8 items-start w-full max-md:flex-wrap max-md:gap-5 max-sm:flex-col max-sm:gap-4">
    <div className="flex flex-col gap-0.5 items-start">
      <h4 className="text-base text-neutral-400">Category</h4>
      <p className="text-base text-white">{category}</p>
    </div>
    <div className="flex flex-col gap-0.5 items-start">
      <h4 className="text-base text-neutral-400">Publication Date</h4>
      <time className="text-base text-white">{date}</time>
    </div>
    <div className="flex flex-col gap-0.5 items-start">
      <h4 className="text-base text-neutral-400">Author</h4>
      <p className="text-base text-white">{author}</p>
    </div>
  </section>
);

const ArticleContent = ({ title, description, category, date, author }) => (
  <div className="flex flex-col flex-1 gap-10 items-start max-md:w-full">
    <header className="flex flex-col gap-3.5 items-start w-full">
      <h2 className="text-2xl font-bold text-white max-sm:text-xl">{title}</h2>
      <p className="text-lg text-neutral-400 max-sm:text-base">{description}</p>
    </header>
    <ArticleMetadata category={category} date={date} author={author} />
  </div>
);
export const NewsHead = ({ articles }) => {
  // ✅ Always filter and slice first
  const valid = articles
    .filter((a) => typeof a.image === "string" && a.image.trim() !== "")
    .slice(0, 4);

  // ✅ Always declare hooks BEFORE any return or condition
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (valid.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % valid.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(timer);
  }, [valid.length]);

  if (valid.length === 0) return null;

  const currentArticle = valid[currentIndex];

  return (
    <article className="flex g-px flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center py-8 sm:py-12 md:py-16 w-full border-t border-neutral-800 relative">
      {/* 🖼️ Image */}
      <div
        className={`w-full md:w-1/2 overflow-hidden transition-all duration-500 ${
          isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <ArticleImage
          src={currentArticle.image}
          alt={currentArticle.title}
          className="hover:scale-105"
        />
      </div>

      {/* 📝 Text */}
      <div
        className={`w-full md:w-1/2 transition-all duration-500 ${
          isTransitioning
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
        }`}
      >
        <ArticleContent
          title={currentArticle.title}
          description={currentArticle.description}
          category={currentArticle.category}
          date={new Date(currentArticle.publishedAt).toLocaleDateString(
            "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          )}
          author={currentArticle.source?.name || "Unknown"}
        />
      </div>

      {/* ⭕ Dots */}
      {valid.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {valid.map((_, index) => (
            <button
              key={index}
              className={`h-2 transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-neutral-600 hover:bg-neutral-500"
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
