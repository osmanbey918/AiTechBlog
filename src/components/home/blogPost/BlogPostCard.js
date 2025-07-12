'use client';

import React, { useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const BlogCoverImage = React.memo(({ src, alt = 'Blog cover' }) => (
  <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden border border-neutral-800">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="100vw"
      priority
    />
  </div>
));
BlogCoverImage.displayName = 'BlogCoverImage';

const BlogAuthor = React.memo(({ name = "Anonymous", specialty = "AI Engineer" }) => {
  const isLongName = name.length > 20;
  const truncated = isLongName ? `${name.slice(0, 20)}...` : name;

  return (
    <div className="text-sm text-neutral-400 mt-4">
      <span className="block text-white font-semibold text-base">{truncated}</span>
      <span>{specialty}</span>
    </div>
  );
});
BlogAuthor.displayName = 'BlogAuthor';

const BlogContent = React.memo(({ date, title, description, id }) => {
  const formattedDate = useMemo(() => (
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  ), [date]);

  return (
    <div className="flex flex-col gap-4" aria-labelledby={`blog-title-${id}`}>
      <time className="text-sm text-neutral-400 font-medium">{formattedDate}</time>
      <h2
        id={`blog-title-${id}`}
        className="text-2xl md:text-3xl font-bold text-white leading-tight line-clamp-3"
      >
        {title}
      </h2>
      <p className="text-neutral-400 text-base md:text-lg line-clamp-2">
        {description}
      </p>
    </div>
  );
});
BlogContent.displayName = 'BlogContent';

const BlogMetrics = React.memo(({ likes = 0, comments = 0, shares = 0 }) => {
  const metrics = useMemo(() => [
    { icon: "/assets/like.svg", count: likes, alt: "Likes" },
    { icon: "/assets/comment.svg", count: comments, alt: "Comments" },
    { icon: "/assets/share.svg", count: shares, alt: "Shares" }
  ], [likes, comments, shares]);

  return (
    <div className="flex gap-3 flex-wrap mt-2">
      {metrics.map((metric, i) => (
        <div
          key={i}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-neutral-800 rounded-full"
        >
          <Image src={metric.icon} width={14} height={14} alt={metric.alt} />
          <span className="text-sm text-neutral-400">
            {metric.count.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
});
BlogMetrics.displayName = 'BlogMetrics';

const ViewBlogButton = React.memo(({ link }) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (link) router.push(`/blogopen/${encodeURIComponent(link)}`);
  }, [link, router]);

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition-colors duration-200"
      aria-label="View blog post"
    >
      <span className="text-sm font-medium text-neutral-300">View Blog</span>
      <Image
        src="/assets/arrow-up-right.svg"
        width={12}
        height={12}
        alt=""
        aria-hidden="true"
      />
    </button>
  );
});
ViewBlogButton.displayName = 'ViewBlogButton';

const BlogPostCard = ({
  id,
  authorName,
  authorSpecialty,
  date,
  title,
  description,
  likes = 0,
  comments = 0,
  shares = 0,
  onViewBlog,
  coverImage
}) => {
  return (
    <article
      className="flex flex-col gap-6 px-6 py-10 w-full border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors max-w-4xl mx-auto"
      aria-labelledby={`blog-title-${id}`}
    >
      {/* Cover Image */}
      {coverImage && <BlogCoverImage src={coverImage} />}

      {/* Author */}
      <BlogAuthor name={authorName} specialty={authorSpecialty} />

      {/* Title, Date, Description */}
      <BlogContent date={date} title={title} description={description} id={id} />

      {/* Metrics + Button */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <BlogMetrics likes={likes} comments={comments} shares={shares} />
        {onViewBlog && <ViewBlogButton link={onViewBlog} />}
      </div>
    </article>
  );
};

export default React.memo(BlogPostCard);
