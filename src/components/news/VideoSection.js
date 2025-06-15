'use client';
import React, { useState, useEffect, memo } from 'react';
import Image from 'next/image';

// Memoize VideoCard to prevent unnecessary re-renders
const VideoCard = memo(({ thumbnail, title, description, videoId, publishedAt, channelTitle }) => {
  const handleClick = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <article className="flex flex-col flex-1 gap-4 justify-center items-start max-md:w-full group cursor-pointer" onClick={handleClick}>
      <div className="relative w-full h-[185px] rounded-xl overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
            <span className="text-2xl text-black">▶</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start w-full">
        <header className="flex flex-col gap-1 items-start w-full">
          <h2 className="w-full text-base font-bold tracking-tight leading-6 text-white group-hover:text-neutral-300 transition-colors">
            {title}
          </h2>
          <p className="w-full text-sm tracking-tight leading-6 text-neutral-400 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span>{channelTitle}</span>
            <span>•</span>
            <time>{new Date(publishedAt).toLocaleDateString()}</time>
          </div>
        </header>
      </div>
    </article>
  );
});

VideoCard.displayName = 'VideoCard';

// Cache for storing video data
const videoCache = {
  data: null,
  timestamp: null,
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutes
};

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    const loadVideos = async () => {
      try {
        // Check cache first
        const now = Date.now();
        if (videoCache.data && videoCache.timestamp && (now - videoCache.timestamp < videoCache.CACHE_DURATION)) {
          setVideos(videoCache.data);
          setLoading(false);
          return;
        }

        const { fetchVideos } = await import('@/utils/videoService');
        const data = await fetchVideos({ maxResults: 3 });
        
        // Update cache
        videoCache.data = data.videos;
        videoCache.timestamp = now;
        
        setVideos(data.videos);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error loading videos:', err);
        
        // Use cached data if available
        if (videoCache.data) {
          setVideos(videoCache.data);
          setError('Using cached data - ' + err.message);
        } else {
          // Set appropriate error message based on the error
          let errorMessage = 'Failed to load videos';
          
          if (err.message.includes('API key')) {
            errorMessage = 'YouTube API configuration error. Please try again later.';
          } else if (err.message.includes('quota')) {
            errorMessage = 'Daily video quota exceeded. Please try again tomorrow.';
          } else if (err.message.includes('Too many requests')) {
            errorMessage = 'Too many requests. Please wait a moment and try again.';
          } else if (err.message.includes('unavailable')) {
            errorMessage = 'YouTube service is temporarily unavailable. Please try again later.';
          }
          
          setError(errorMessage);

          // Implement retry logic for certain errors
          if (retryCount < MAX_RETRIES && 
              (err.message.includes('network') || err.message.includes('unavailable'))) {
            setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, Math.pow(2, retryCount) * 1000); // Exponential backoff
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [retryCount]); // Add retryCount as dependency

  if (loading) {
    return (
      <section className="box-border flex gap-8 items-start px-20 py-16 w-full border-t border-solid border-t-neutral-800 max-md:flex-col max-md:gap-8 max-md:p-10 max-sm:gap-5 max-sm:p-5">
        <div className="flex justify-center items-center w-full min-h-[200px]">
          <div className="text-neutral-400">Loading videos...</div>
        </div>
      </section>
    );
  }

  if (error && !videos.length) {
    return (
      <section className="box-border flex gap-8 items-start px-20 py-16 w-full border-t border-solid border-t-neutral-800 max-md:flex-col max-md:gap-8 max-md:p-10 max-sm:gap-5 max-sm:p-5">
        <div className="flex flex-col justify-center items-center w-full min-h-[200px] gap-4">
          <div className="text-red-400">{error}</div>
          {retryCount < MAX_RETRIES && (
            <button 
              onClick={() => setRetryCount(prev => prev + 1)}
              className="px-4 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="box-border flex gap-8 items-start px-20 py-16 w-full border-t border-solid border-t-neutral-800 max-md:flex-col max-md:gap-8 max-md:p-10 max-sm:gap-5 max-sm:p-5">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          videoId={video.id}
          thumbnail={video.thumbnail}
          title={video.title}
          description={video.description}
          publishedAt={video.publishedAt}
          channelTitle={video.channelTitle}
        />
      ))}
      {error && (
        <div className="w-full text-center text-yellow-400 text-sm mt-4">
          {error}
        </div>
      )}
    </section>
  );
};

export default VideoSection;
