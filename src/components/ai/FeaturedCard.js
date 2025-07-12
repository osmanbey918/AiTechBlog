import Image from "next/image";
import Link from "next/link";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function calculateReadTime(text = '', wpm = 200) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wpm);
  return `${minutes} min read`;
}

export default function FeaturedCard({
  slug,
  image,
  title,
  des,
  isVideo,
  author = "Anonymous",
  category = "AI",
  date = new Date().toISOString(),
  readTimeText
}) {
  const readTime = readTimeText || calculateReadTime(des);

  return (
    <Link
      href={`/blogopen/${slug}`}
      className="group grid grid-cols-1 md:grid-cols-2 w-full h-[500px] rounded-sm overflow-hidden "
    >
      {/* Left Image Side (visible only on md+) */}
      <div className="hidden md:block relative h-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
      </div>

      {/* Right Content Area */}
      <div className="relative flex items-center p-8 md:p-12 text-white">
        <div className="max-w-lg">
          {/* Category + Video Tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-neutral-800 text-xs px-3 py-1 rounded-full border border-neutral-700 uppercase tracking-wide text-yellow-400">
              {category}
            </span>
            {isVideo && (
              <span className="bg-yellow-400 text-black text-xs font-semibold rounded-full px-3 py-1 shadow-sm">
                ▶ Video
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-md">
            {title}
          </h2>

          {/* Description */}
          <p className="text-neutral-300 text-sm md:text-base line-clamp-3 mb-4">
            {des}
          </p>

          {/* Meta Info */}
          <div className="flex items-center text-sm text-neutral-400 gap-2 mb-4 flex-wrap">
            <span>By <span className="text-white font-medium">{author}</span></span>
            <span>•</span>
            <span>{formatDate(date)}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>

          {/* CTA */}
          <span className="inline-block text-yellow-400 text-sm font-semibold hover:underline">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
}