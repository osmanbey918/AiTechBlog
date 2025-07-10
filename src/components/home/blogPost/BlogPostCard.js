"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';


function AuthorProfile({ name }) {
    const image = getAvatarFromName(name || 'Anonymous');
    const displayName = name || "Anonymous";
    const isLongName = displayName.length > 15;

    return (
        <div className="flex flex-col items-center gap-4 max-sm:flex-row max-sm:gap-3 w-[130px] max-sm:w-full">
            <div className="relative w-16 h-16">
                <Image
                    src={image}
                    alt={`${displayName}'s avatar`}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                />
            </div>
            <div className="text-center max-sm:text-left">
                <p className="text-white font-semibold text-lg break-words max-w-[200px]"
                    title={isLongName ? displayName : undefined}>
                    {isLongName ? `${displayName.substring(0, 15)}...` : displayName}
                </p>
                <p className="text-neutral-400 text-sm">AI engineer</p>
            </div>
        </div>
    );
}

function getAvatarFromName(name) {
    // Simple hash function to get consistent number from name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const id = Math.abs(hash % 90);  // Keep id between 0-89
    const gender = hash % 2 === 0 ? 'men' : 'women';

    return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
}

function BlogContent({ date, title, description }) {
    return (
        <div className="flex flex-col flex-1 gap-6 items-start max-sm:gap-4 max-sm:w-full">
            <time className="text-sm font-medium text-neutral-400">
                {new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}
            </time>

            <div className="flex flex-col gap-1.5 items-start w-full ">
                <h2 className="w-full text-2xl font-bold tracking-tighter line-clamp-3 leading-8 text-white max-sm:text-lg max-sm:tracking-tight">
                    {title}
                </h2>
                <p className="w-full text-base tracking-tight leading-6 line-clamp-1 text-neutral-400 max-sm:text-sm max-sm:tracking-tight">
                    {description}
                </p>
            </div>
        </div>
    );
}

function BlogMetrics({ likes, comments, shares }) {
    return (
        <div className="flex gap-2 items-start max-sm:flex-wrap">
            {[{
                icon: "/assets/like.svg",
                count: likes
            }, {
                icon: "/assets/comment.svg",
                count: comments
            }, {
                icon: "/assets/share.svg",
                count: shares
            }].map((metric, index) => (
                <div
                    key={index}
                    className="flex gap-0.5 justify-center items-center px-3 py-1.5 border bg-zinc-900 border-neutral-800 rounded-[100px]"
                >
                    <Image src={metric.icon} height={12} width={12} alt='"icon' />
                    <span className="text-sm tracking-tight leading-5 text-neutral-400">{metric.count}</span>
                </div>
            ))}
        </div>
    );
}

function ViewBlogButton({ link }) {
    
    const router = useRouter();
    
    const handleClick = () => {
      console.log("good");
      console.log(link);
    if (!link) return;
    
    router.push(`/blogopen/${encodeURIComponent(link)}`);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition-colors duration-200 max-sm:w-full max-sm:justify-center"
    >
      <span className="text-sm font-medium text-neutral-300 whitespace-nowrap">
        View Blog
      </span>
      <Image
        src="/assets/arrow-up-right.svg"
        width={12}
        height={12}
        alt="Navigate to blog"
      />
    </button>
  );
}


function BlogPostCard({
    authorImage,
    authorName,
    authorSpecialty,
    date,
    title,
    description,
    likes,
    comments,
    shares,
    onViewBlog,
    id,
}) {
    return (
        <article className="flex gap-10 items-start g-px py-16 w-full border border-neutral-800 max-md:py-10 max-sm:flex-col max-sm:gap-5 max-sm:py-8">
            <AuthorProfile image={authorImage} name={authorName} specialty={authorSpecialty} />
            <div className="flex flex-1 gap-10 items-start max-sm:flex-col max-sm:gap-5 max-sm:items-start max-sm:w-full">
                <div className="flex flex-col gap-6 max-sm:gap-4 w-full">
                    <BlogContent date={date} title={title} description={description} />
                    <BlogMetrics likes={10} comments={25} shares={55} />
                </div>

                {onViewBlog && < ViewBlogButton link={onViewBlog}/>}
            </div>
        </article>

    );
}

export default BlogPostCard;
