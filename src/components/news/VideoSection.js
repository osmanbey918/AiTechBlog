'use client';
import React from 'react';
import Image from 'next/image';

const VideoCard = ({ thumbnail, title, description, videoId, publishedAt, channelTitle }) => {
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
};

const VideoSection = () => {
  const [videos, setVideos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const loadVideos = async () => {
      try {
        const { fetchVideos } = await import('@/utils/videoService');
        const data = await fetchVideos({ maxResults: 3 });
        setVideos(data.videos);
      } catch (err) {
        setError('Failed to load videos');
        console.error('Error loading videos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  if (loading) {
    return (
      <section className="box-border flex gap-8 items-start px-20 py-16 w-full border-t border-solid border-t-neutral-800 max-md:flex-col max-md:gap-8 max-md:p-10 max-sm:gap-5 max-sm:p-5">
        <div className="flex justify-center items-center w-full min-h-[200px]">
          <div className="text-neutral-400">Loading videos...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="box-border flex gap-8 items-start px-20 py-16 w-full border-t border-solid border-t-neutral-800 max-md:flex-col max-md:gap-8 max-md:p-10 max-sm:gap-5 max-sm:p-5">
        <div className="flex justify-center items-center w-full min-h-[200px]">
          <div className="text-red-400">{error}</div>
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
    </section>
  );
};

export default VideoSection;
