"use client";
import React, { useState, useEffect, useMemo } from "react";
import { NewsSlide } from "./HeadComp";

export const NewsHead = ({ articles }) => {
  const valid = useMemo(() => {
    return articles
      .filter((a) => typeof a.image === "string" && a.image.trim() !== "")
      .slice(0, 4);
  }, [articles]);

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
  console.log("iam rendering");

  return (
    <article className="flex g-px flex-col md:flex-row gap-6 md:gap-10 items-start h-[500px] max-sm:h-[800px] md:items-center py-8 sm:py-12 md:py-16 w-full border-t border-neutral-800 relative">
      <NewsSlide article={currentArticle} isTransitioning={isTransitioning} />

      {/* ⭕ Dots */}
      {valid.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {valid.map((_, index) => (
            <button
              key={index}
              className={`h-2 transition-all duration-300 rounded-full ${index === currentIndex
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
