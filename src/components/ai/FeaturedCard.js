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
  description,
  isVideo,
  author = "Anonymous",
  category = "AI",
  datePublished ,
  readTimeText
}) {
  const readTime = readTimeText || calculateReadTime(description);

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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 line-clamp-5 leading-tight drop-shadow-md group-hover:underline group-hover:decoration-yellow-400 group-hover:drop-shadow-md transition">
            {title}
          </h2>

          {/* descriptioncription */}
          <p className="text-neutral-300 text-sm md:text-base line-clamp-3 mb-4">
            {description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center text-sm text-neutral-400 gap-2 mb-4 flex-wrap">
            <span>By <span className="text-white font-medium">{author}</span></span>
            <span>•</span>
            <span>{formatDate(datePublished)}</span>
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
export function FeaturedCardInvert({
  slug,
  image,
  title,
  description,
  isVideo,
  author = "Anonymous",
  category = "AI",
  date = new Date().toISOString(),
  readTimeText
}) {
  const readTime = readTimeText || calculateReadTime(description);

  return (
    <Link
      href={`/blogopen/${slug}`}
      className="group grid grid-cols-1 md:grid-cols-2 w-full h-[500px] rounded-sm overflow-hidden"
    >
      {/* Left Content Area (Text) */}
      <div className="relative flex items-center text-black">
        <div className="max-w-lg">
          {/* Category + Video Tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-yellow-100 text-xs px-3 py-1 rounded-full border border-yellow-300 uppercase tracking-wide text-yellow-700">
              {category}
            </span>
            {isVideo && (
              <span className="bg-yellow-400 text-black text-xs font-semibold rounded-full px-3 py-1 shadow-sm">
                ▶ Video
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-gray-900">
            {title}
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-sm md:text-base line-clamp-3 mb-4">
            {description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center text-sm text-gray-500 gap-2 mb-4 flex-wrap">
            <span>
              By <span className="text-black font-medium">{author}</span>
            </span>
            <span>•</span>
            <span>{formatDate(date)}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>

          {/* CTA */}
          <span className="inline-block text-yellow-600 text-sm font-semibold hover:underline">
            Read More →
          </span>
        </div>
      </div>

      {/* Right Image Side */}
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
    </Link>
  );
}

export function BlogCard({
  slug,
  image,
  title,
  description,
  author = "Unknown",
  datePublished = new Date().toISOString()
}) {
  return (
    <Link
      href={`/blogopen/${slug}`}
      className="w-full group overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 hover:border-yellow-500 transition-all duration-300 hover:shadow-xl flex flex-col md:flex-row"
    >
      {/* Left Side Image */}
      {image && (
        <div className="relative w-full md:w-1/3 h-60 md:h-auto">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
          />
        </div>
      )}

      {/* Right Side Content */}
      <div className="flex flex-col justify-between p-5 flex-1">
        {/* Top Content */}
        <div className="mb-4">
          <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 group-hover:text-yellow-400 transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-sm text-neutral-400 line-clamp-4">
            {description}
          </p>
        </div>

        {/* Meta Info */}
        <div className="flex items-center text-xs text-neutral-500 gap-2 mt-auto">
          <span className="text-green-400 font-medium">{author}</span>
          <span>•</span>
          <span>{formatDate(datePublished)}</span>
        </div>
      </div>
    </Link>
  );
}


export function BlogCardInvert({ slug, image, title, description }) {
  return (
    <Link
      href={`/blogopen/${slug}`}
      className=" rounded-sm overflow-hidden shadow hover:shadow-lg transition-transform hover:-translate-y-1 "
    >
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-gray-900 text-lg font-semibold line-clamp-2 mb-1 hover:underline decoration-black">
          {title}
        </h3>
        <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}

export function FeaturedCardan({ slug, image, title, description, isVideo }) {
  return (
    <Link
      href={`/blogopen/${slug}`}
      className="group relative flex flex-col justify-end h-[500px] rounded-2xl overflow-hidden border border-neutral-800 hover:border-yellow-400 transition-all duration-500 shadow-xl hover:shadow-yellow-400/20"
    >
      {/* Background Image - Covers the entire card */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-100" // Image scales and brightens on hover
        sizes="100vw"
      />

      {/* Video Indicator - Always visible if a video */}
      {isVideo && (
        <div className="absolute top-8 right-8 z-20 bg-yellow-400 text-black text-2xl font-bold rounded-full p-4 shadow-lg">
          ▶
        </div>
      )}

      {/* Content Overlay - Initially subtle, reveals on hover */}
      <div className="relative z-10 p-8 pt-24 bg-gradient-to-t from-black via-black/70 to-transparent opacity-100 group-hover:from-black/90 group-hover:via-black/95 group-hover:to-black/30 transition-all duration-500">
        <h3 className="text-4xl font-extrabold text-white leading-tight mb-2">
          {title}
        </h3>
        <p className="text-neutral-300 text-base leading-relaxed line-clamp-3 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 transition-all duration-500 overflow-hidden">
          {description}
        </p>
        <span className="mt-4 text-yellow-400 font-semibold opacity-0 group-hover:opacity-100 group-hover:underline inline-block transition-all duration-500">
          Read More →
        </span>
      </div>
    </Link>
  );
}