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
    <article className="flex flex-col col-span-1 mx-auto max-w-[430px] bg-neutral-950 rounded-sm overflow-hidden shadow-md hover:shadow-xl transition duration-300 ">
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
      <div className="flex flex-col justify-between flex-grow py-4 gap-3 bg-zinc-900 px-2">
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
        <header className="flex flex-col gap-1 ">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-white line-clamp-2 hover:underline hover:decoration-[#FFD11A] hover:decoration-2"
          >
            {title}
          </a>
          <p className="text-sm text-neutral-300 line-clamp-3">{description}</p>
        </header>
      </div>
    </article>
  );
};

export default NewsCard;
export const NewsSecondCard = ({
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
    <article className="flex flex-col col-span-1 sm:col-span-2 lg:col-span-2 bg-neutral-950 rounded-sm overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <div className="relative aspect-video">
        <a href={url} rel="noopener noreferrer" target="_blank">
          <Image
            src={imgSrc}
            alt={altText}
            fill
            onError={() => setImgSrc('/assets/news.svg')}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </a>
        {/* Optional dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0ab6] via-[#0a0a0ac0] to-transparent z-0"></div>
      </div>

      <div className="flex flex-col justify-between flex-grow -mt-32 z-10 px-4 py-6 gap-3 relative">
        <header className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm text-neutral-400">
            <span className="capitalize">{category}</span>
            <span className="text-xs text-neutral-500">
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }).format(new Date(publishedAt))}
            </span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-bold text-white line-clamp-2 hover:underline hover:decoration-yellow-400"
          >
            {title}
          </a>
          {/* <p className="text-sm text-neutral-300 line-clamp-3">{description}</p> */}
        </header>
      </div>
    </article>

  );
};
