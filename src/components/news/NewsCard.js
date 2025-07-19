import Image from 'next/image';
import Link from 'next/link';

const NewsCard = ({
  title,
  category,
  description,
  publishedAt,
  url,
  image,
  altText = "News Image"
}) => {
  if (!image || image.trim() === "") return null;

  return (
    <article className="flex flex-col mx-auto max-sm:row-span-3 col-span-1 max-w-[430px] rounded-md overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <div className="relative aspect-video">
        <a href={`open/news/${url}`} rel="noopener noreferrer" >
          <Image
            src={image}
            alt={altText}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </a>
      </div>
      <div className="flex flex-col justify-between flex-grow py-4 gap-3 bg-zinc-900 px-2">
        <div className="flex justify-between items-center text-sm text-neutral-400">
          <span>{category}</span>
          {publishedAt && <span className="text-xs text-neutral-500">
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }).format(new Date(publishedAt))}
          </span>}
        </div>
        <header className="flex flex-col gap-1">
          <a
            href={`open/news/${url}`}

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

// const NewsCard = ({
//   title,
//   category,
//   description,
//   publishedAt,
//   slug,
//   image,
//   altText = 'News Image',
//   author,
//   commentsCount
// }) => {
//   if (!image || image.trim() === '') return null;

//   return (
//     <article className="flex flex-col col-span-1 mx-auto max-w-xl bg-black rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
//       <div className="relative aspect-video">
//         <Link href={`/open/blog/${slug}`} rel="noopener noreferrer" target="_blank">
//           <Image
//             src={image}
//             alt={altText}
//             fill
//             className="object-cover transition-transform duration-500 hover:scale-105"
//             sizes="(max-width: 768px) 100vw, 33vw"
//           />
//         </Link>
//       </div>
//       <div className="p-6 flex flex-col gap-4 text-white bg-black">
//         <header className="flex flex-col gap-1">
//           <Link href={`/open/blog/${slug}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-2xl font-bold leading-snug hover:text-green-400 transition-colors"
//           >
//             {title}
//           </Link>
//           <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
//         </header>

//         <div className="flex items-center justify-between text-xs text-neutral-500 flex-wrap gap-2">
//           <span className="uppercase font-bold text-green-400">{author}</span>
//           <span className="text-neutral-600">|</span>
//           {publishedAt && (
//             <span>
//               {new Intl.DateTimeFormat('en-US', {
//                 year: 'numeric',
//                 month: 'short',
//                 day: 'numeric',
//               }).format(new Date(publishedAt))}
//             </span>
//           )}
//           {commentsCount !== undefined && (
//             <>
//               <span className="text-neutral-600">|</span>
//               <span>{commentsCount} comments</span>
//             </>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// };


export default NewsCard;


export const NewsSecondCard = ({
  title,
  category,
  description,
  publishedAt,
  url,
  image,
  altText = "News Image",
}) => {
  if (!image?.trim()) return null;

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(publishedAt));

  return (
    <article className="relative w-full max-sm:mx-auto col-span-2 max-sm:col-span-1 max-sm:row-span-2 row-span-1 h-full max-sm:max-w-[430px] aspect-[16/9] rounded-md overflow-hidden shadow-md hover:shadow-xl transition duration-300">

      {/* Full Image */}
      <Link href={`open/news/${url}`} rel="noopener noreferrer">
        <Image
          src={image}
          alt={altText || title}
          fill
          sizes="100vw"
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          priority
        />
      </Link>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      {/* Text Over Image */}
      <div className="absolute bottom-0 left-0 right-0 py-4 px-2 z-10 flex flex-col gap-2">
        <div className="flex justify-between text-xs text-neutral-300">
          <span className="capitalize">{category}</span>
          <span>{formattedDate}</span>
        </div>
        <Link
          href={`open/news/${url}`}
          rel="noopener noreferrer"
          className="text-lg font-bold text-white line-clamp-2 hover:underline hover:decoration-yellow-400"
        >
          {title}
        </Link>
        <p className="text-sm text-neutral-300 line-clamp-2">{description}</p>
      </div>

    </article>

  );
};