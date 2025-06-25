'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const NewsCard = ({
  image,
  title,
  category,
  description,
  publishedAt,
  url,
  altText = "News Image"
}) => {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <article className="flex flex-col bg-neutral-950 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-video">
        <a href={url} rel="noopener noreferrer" target="_blank">
          <Image
            src={imgSrc}
            alt={altText}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            onError={() => setImgSrc('/assets/news.svg')}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </a>
      </div>
      <div className="flex flex-col justify-between flex-grow py-4 gap-3">
        <header className="flex flex-col gap-1">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-white line-clamp-2 hover:underline hover:decoration-[#FFD11A] hover:decoration-2"
          >
            {title}
          </a>
          <div className="flex justify-between items-center text-sm text-neutral-400">
            <span>{category}</span>
            <span className="text-xs text-neutral-500">
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }).format(new Date(publishedAt))}
            </span>
          </div>
          <p className="text-sm text-neutral-300 line-clamp-3">{description}</p>
        </header>
      </div>
    </article>
  );
};

export default NewsCard;
