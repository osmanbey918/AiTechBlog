"use client";
import React, { useState, useEffect } from "react";
import NewsSlide from "./HeadComp";

const NewsHead = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchAndPrepare = async () => {
      const res = await fetch(`/api/news`);
      const data = await res.json();
      console.log(data.articles);

      const valid = data.articles
        .filter((a) => typeof a.image === "string" && a.image.trim() !== "")
        .slice(0, 4);

      await Promise.all(
        valid.map((a) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = a.image;
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      setSlides(valid); // Stored once
    };

    fetchAndPrepare();
  }, []);

  // Carousel loop
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides]);

  if (slides.length === 0) return null;
console.log("reneder");

  const currentArticle = slides[currentIndex];

  return (
    <article className="flex flex-col md:flex-row gap-6 md:gap-10 items-start h-[500px] max-sm:h-[800px] md:items-center py-8 sm:py-12 md:py-16 w-full border-t border-neutral-800 relative">
      <NewsSlide article={currentArticle} isTransitioning={isTransitioning} />

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
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
    </article>
  );
};

export default NewsHead;
