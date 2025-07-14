import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function CategoryBadge({ category }) {
  return (
    <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full text-yellow-400 w-auto">
      {category}
    </span>

  );
}

export function BlogPostCardVergeStyle({
  title,
  description,
  datePublished,
  category = "Tech",
  author = "Anonymous",
  image,
  slug,
}) {
  const views = getRandomViews(); // fixed per render

  return (
    <Link href={`/blogopen/${slug}`}>
      <article className="group flex justify-between items-start w-full max-w-4xl  border-b border-zinc-600 py-6 gap-6 hover:bg-neutral-900/50 transition rounded-xs ">
        {/* Left Content */}
        <div className="flex flex-col gap-2 flex-1">
          <CategoryBadge category={category} />
          <h2 className="text-white text-lg md:text-xl font-serif font-semibold leading-tight group-hover:text-yellow-400 group-hover:drop-shadow-md transition">
            {title}
          </h2>
          <div className="flex items-center text-xs text-neutral-500 gap-3 flex-wrap">
            <span className="text-gray-400 font-medium">{author}</span>
            <span>{formatDate(datePublished)}</span>
            <span className="text-neutral-600 ">|</span>
            {/* <span><Eye/></span> */}
            <span className='flex gap-1'><Eye />{views}</span>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-28 h-20 md:w-36 md:h-24 rounded-lg overflow-hidden border border-neutral-700 shadow-inner shrink-0">
          <Image
            src={image || "/assets/default-cover.jpg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </article>
    </Link>
  );
}

export default function BlogPostCard({
  title,
  description,
  datePublished,
  category = "Tech",
  author = "Anonymous",
  image,
  slug,
}) {
  const views = getRandomViews();

  return (
    <Link href={`/blogopen/${slug}`}>
      <article className="group flex flex-col pr-2 md:flex-row items-start w-full border-b border-r border-neutral-800 py-6 gap-6 hover:bg-neutral-900/40 transition rounded-xl hover:shadow-md">

        {/* Left Image */}
        <div className="relative w-full md:w-64 h-44 md:h-40 rounded-md overflow-hidden border border-neutral-700 shadow-inner shrink-0">
          <Image
            src={image || "/assets/default-cover.jpg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-2">
            <CategoryBadge category={category} />
          </div>

          <h2 className="text-white underline decoration-yellow-400 text-lg md:text-xl font-serif font-semibold leading-snug group-hover:text-yellow-400 transition">
            {title}
          </h2>


          <p className="text-sm text-neutral-400 line-clamp-3">
            {description}
          </p>

          <div className="flex items-center text-xs text-neutral-500 gap-3 mt-2 flex-wrap">
            <span className="text-gray-400 font-medium">{author}</span>
            <span>{formatDate(datePublished)}</span>
            <span className="text-neutral-600">|</span>
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {views}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
function getRandomViews(min = 10, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// export function BlogCardVergeStyle({
//     title,
//     category = "News",
//     author = "Anonymous",
//     time = "5:00 PM GMT+5",
//     comments = 0,
//     image = "/assets/default-cover.jpg",
//     slug = "#"
// }) {
//     return (
//         <Link href={`/blogopen/${slug}`} className="group w-full border-b border-neutral-800 py-6 flex justify-between items-start gap-4 hover:bg-neutral-900/50 transition">
//             {/* Left Content */}
//             <div className="flex flex-1 flex-col md:flex-row items-start gap-4">
//                 {/* Vertical Category Label */}
//                 {/* <div className="text-xs font-medium tracking-widest text-neutral-500 rotate-180 writing-vertical-lr hidden sm:block">
//           {category}
//         </div> */}

//                 {/* Main Content */}
//                 <div className="flex-1">
//                     <h2 className="text-white text-lg md:text-xl font-bold leading-snug group-hover:text-yellow-400 transition">
//                         {title}
//                     </h2>
//                     <div className="flex items-center text-xs text-neutral-500 mt-2 gap-3 flex-wrap">
//                         <span className="text-blue-400 font-semibold uppercase">{author}</span>
//                         <span>{time}</span>
//                         <span className="text-neutral-600">|</span>
//                         <span>💬 {comments}</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Right Image */}
//             <div className="min-w-[100px] w-[120px] h-[80px] relative rounded-md overflow-hidden shrink-0">
//                 <Image
//                     src={image}
//                     alt={title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//             </div>
//         </Link>
//     );
// }

const Eye = () => {
  return (<svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-neutral-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
    />
  </svg>)
}
