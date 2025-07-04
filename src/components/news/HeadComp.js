"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";

// 🖼️ Article Image
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
ArticleImage.displayName = "ArticleImage";
export const MemoArticleImage = React.memo(ArticleImage);

// 🧾 Metadata Section
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
ArticleMetadata.displayName = "ArticleMetadata";
export const MemoArticleMetadata = React.memo(ArticleMetadata);

// 📄 Article Content
const ArticleContent = ({ title, description, category, date, author }) => (
  <div className="flex flex-col flex-1 gap-10 items-start max-md:w-full">
    <header className="flex flex-col gap-3.5 items-start w-full">
      <h2 className="text-2xl font-bold text-white max-sm:text-xl">{title}</h2>
      <p className="text-lg text-neutral-400 max-sm:text-base">{description}</p>
    </header>
    <MemoArticleMetadata category={category} date={date} author={author} />
  </div>
);
ArticleContent.displayName = "ArticleContent";
export const MemoArticleContent = React.memo(ArticleContent);

// 🧩 Slide Component
const NewsSlide = ({ article, isTransitioning }) => {
  const formattedDate = useMemo(() => {
    return new Date(article.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [article.publishedAt]);

  return (
    <>
      <div
        className={`w-full md:w-1/2 overflow-hidden transition-all duration-500 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        <MemoArticleImage src={article.image} alt={article.title} className="hover:scale-105" />
      </div>
      <div
        className={`w-full md:w-1/2 transition-all duration-500 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
      >
        <MemoArticleContent
          title={article.title}
          description={article.description}
          category={article.category}
          date={formattedDate}
          author={article.source?.name || "Unknown"}
        />
      </div>
    </>
  );
};
NewsSlide.displayName = "NewsSlide";

export default React.memo(NewsSlide);
