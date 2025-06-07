import React from 'react';

// const NewsCard = ({
//   image,
//   title,
//   category,
//   likes,
//   shares,
//   altText = ""
// }) => {
//   return (
//     <article className="flex flex-col flex-1 gap-4 justify-center items-start max-md:w-full">
//       <img
//         src={image}
//         alt={altText}
//         className="object-cover w-full rounded-xl h-[185px]"
//       />
//       <div className="flex flex-col gap-4 items-start w-full">
//         <header className="flex flex-col gap-1 items-start w-full">
//           <h2 className="w-full text-base font-bold tracking-tight leading-6 text-white">
//             {title}
//           </h2>
//           <p className="w-full text-base tracking-tight leading-6 text-neutral-400">
//             {category}
//           </p>
//         </header>
//         <div className="flex gap-12 items-center w-full max-sm:flex-col max-sm:gap-4">
//           <div className="flex gap-2 items-start max-sm:justify-center">
//             <div className="flex gap-1 justify-center items-center px-3.5 py-1.5 border border-solid bg-zinc-900 border-neutral-800 rounded-[100px]">
//               <span className="text-white">+</span>
//               <span className="text-sm tracking-tight leading-5 text-neutral-400">
//                 {likes}
//               </span>
//             </div>
//             <div className="flex gap-1 justify-center items-center px-3.5 py-1.5 border border-solid bg-zinc-900 border-neutral-800 rounded-[100px]">
//               <span className="text-white">+</span>
//               <span className="text-sm tracking-tight leading-5 text-neutral-400">
//                 {shares}
//               </span>
//             </div>
//           </div>
//           <button className="flex flex-1 gap-1 justify-center items-center px-5 py-3.5 rounded-lg border border-solid bg-neutral-900 border-neutral-800 max-sm:justify-center">
//             <span className="text-sm tracking-tight leading-5 text-neutral-400">
//               Read More
//             </span>
//             <span className="text-white">→</span>
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// };

const NewsSection = () => {
  const newsArticles = [
    {
      id: 1,
      image: "https://placehold.co/400x185/d4a574/d4a574",
      title: "A Decisive Victory for Progressive Policies",
      category: "Politics",
      likes: "2.2k",
      shares: "60",
      altText: ""
    },
    {
      id: 2,
      image: "https://placehold.co/400x185/2a5a7a/2a5a7a",
      title: "Tech Giants Unveil Cutting-Edge AI Innovations",
      category: "Technology",
      likes: "6k",
      shares: "92",
      altText: ""
    },
    {
      id: 3,
      image: "https://placehold.co/400x185/4a8fb8/4a8fb8",
      title: "COVID-19 Variants",
      category: "Health",
      likes: "10k",
      shares: "124",
      altText: ""
    }
  ];

  return (
<section className="box-border flex flex-wrap gap-6 md:gap-10 lg:gap-10 justify-center items-start g-px py-8 sm:py-12 md:py-16 w-full border-t border-solid border-t-neutral-800">
  {newsArticles.map((article) => (
    <NewsCard
      key={article.id}
      image={article.image}
      title={article.title}
      category={article.category}
      likes={article.likes}
      shares={article.shares}
      altText={article.altText}
    />
  ))}
</section>

  );
};

const NewsCard = ({
  image,
  title,
  category,
  likes,
  shares,
  altText = ""
}) => {
  return (
    <article className="flex flex-col pl-0 pr-0 flex-1 gap-4 min-w-[240px] justify-center items-start max-md:w-full">
      <img
        src={image}
        alt={altText}
        className="object-cover w-full rounded-xl h-[185px]"
      />
      <div className="flex flex-col gap-4 items-start w-full">
        <header className="flex flex-col gap-1 items-start w-full">
          <h2 className="w-full text-base font-bold tracking-tight leading-6 text-white">
            {title}
          </h2>
          <p className="w-full text-base tracking-tight leading-6 text-neutral-400">
            {category}
          </p>
        </header>
        <div className="flex gap-12 items-center w-full max-sm:flex-col max-sm:gap-4">
          <div className="flex gap-2 items-start max-sm:justify-center">
            <div className="flex gap-1 justify-center items-center px-3.5 py-1.5 border border-solid bg-zinc-900 border-neutral-800 rounded-[100px]">
              {/* <HeartIcon /> */}
              <span className="text-sm tracking-tight leading-5 text-neutral-400">
                {likes}
              </span>
            </div>
            <div className="flex gap-1 justify-center items-center px-3.5 py-1.5 border border-solid bg-zinc-900 border-neutral-800 rounded-[100px]">
              {/* <ShareIcon /> */}
              <span className="text-sm tracking-tight leading-5 text-neutral-400">
                {shares}
              </span>
            </div>
          </div>
          <button className="flex flex-1 gap-1 justify-center items-center px-5 py-3.5 rounded-lg border border-solid bg-neutral-900 border-neutral-800 max-sm:justify-center">
            <span className="text-sm tracking-tight leading-5 text-neutral-400">
              Read More
            </span>
            {/* <ArrowIcon /> */}
          </button>
        </div>
      </div>
    </article>
  );
};


export default NewsSection;
