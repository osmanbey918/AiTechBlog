import React from 'react';

const VideoCard = ({ authorImage, title, description }) => {
  return (
    <article className="flex flex-col flex-1 gap-4 justify-center items-start max-md:w-full">
      <img
        src={authorImage}
        alt="Author"
        className="object-cover w-full rounded-xl h-[185px]"
      />
      <div className="flex flex-col gap-4 items-start w-full">
        <header className="flex flex-col gap-1 items-start w-full">
          <h2 className="w-full text-base font-bold tracking-tight leading-6 text-white">
            {title}
          </h2>
          <p className="w-full text-base tracking-tight leading-6 text-neutral-400">
            {description}
          </p>
        </header>
        <button className="flex gap-1 justify-center items-center px-5 py-3.5 rounded-lg border border-solid bg-neutral-900 border-neutral-800 max-sm:justify-center">
          <span className="text-sm tracking-tight leading-5 text-neutral-400">
            Watch Now
          </span>
          <span className="text-white">▶</span>
        </button>
      </div>
    </article>
  );
};

const VideoSection = () => {
  const videoData = [
    {
      authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      title: "AI Breakthroughs in 2025",
      description:
        "A deep dive into the latest advancements in AI technology this year.",
    },
    {
      authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      title: "Quantum Computing Explained",
      description:
        "Understanding the principles and applications of quantum computing.",
    },
    {
      authorImage: "https://randomuser.me/api/portraits/men/15.jpg",
      title: "The Future of Biotechnology",
      description:
        "Exploring the innovations shaping the future of biotech.",
    },
  ];

  return (
    <section className="box-border flex gap-8 items-start px-20 py-16 w-full border-t border-solid border-t-neutral-800 max-md:flex-col max-md:gap-8 max-md:p-10 max-sm:gap-5 max-sm:p-5">
      {videoData.map((video, index) => (
        <VideoCard
          key={index}
          authorImage={video.authorImage}
          title={video.title}
          description={video.description}
        />
      ))}
    </section>
  );
};

export default VideoSection;
