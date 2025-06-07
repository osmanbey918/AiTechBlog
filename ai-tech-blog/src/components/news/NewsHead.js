import React from 'react';

const StatBadge = ({ count }) => {
  return (
    <div className="flex gap-1 justify-center items-center px-3.5 py-1.5 border border-solid bg-zinc-900 border-neutral-800 rounded-[100px]">
      <span className="text-neutral-400">+</span>
      <span className="text-sm tracking-tight leading-5 text-neutral-400">
        {count}
      </span>
    </div>
  );
};

const ArticleImage = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="object-cover rounded-xl h-[325px] w-[515px] max-md:w-full max-md:h-auto max-md:max-w-[515px]"
    />
  );
};

const ArticleMetadata = ({ category, date, author }) => {
  return (
    <section className="flex gap-8 items-start w-full max-md:flex-wrap max-md:gap-5 max-sm:flex-col max-sm:gap-4">
      <div className="flex flex-col gap-0.5 items-start">
        <h4 className="text-base tracking-tight leading-6 text-neutral-400">
          Category
        </h4>
        <p className="text-base tracking-tight leading-6 text-white">
          {category}
        </p>
      </div>
      <div className="flex flex-col gap-0.5 items-start">
        <h4 className="text-base tracking-tight leading-6 text-neutral-400">
          Publication Date
        </h4>
        <time className="text-base tracking-tight leading-6 text-white">
          {date}
        </time>
      </div>
      <div className="flex flex-col gap-0.5 items-start">
        <h4 className="text-base tracking-tight leading-6 text-neutral-400">
          Author
        </h4>
        <p className="text-base tracking-tight leading-6 text-white">
          {author}
        </p>
      </div>
    </section>
  );
};

const ArticleStats = ({ likes, shares }) => {
  return (
    <section className="flex justify-between items-start w-full max-sm:flex-col max-sm:gap-4 max-sm:">
      <div className="flex gap-2 items-start max-sm:justify-center">
        <StatBadge count={likes} />
        <StatBadge count={shares} />
      </div>
      <button className="flex gap-2.5 items-center px-5 py-3.5 rounded-lg border border-solid bg-neutral-900 border-neutral-800 max-sm:justify-center">
        <span className="text-sm tracking-tight leading-5 text-neutral-400">
          Read More
        </span>
      </button>
    </section>
  );
};

const ArticleContent = ({
  title,
  description,
  category,
  date,
  author,
  likes,
  shares
}) => {
  return (
    <div className="flex flex-col flex-1 gap-10 items-start max-md:w-full">
      <header className="flex flex-col gap-3.5 items-start w-full">
        <h2 className="w-full text-2xl font-bold tracking-tighter leading-9 text-white max-sm:text-xl">
          {title}
        </h2>
        <p className="w-full text-lg tracking-tight leading-7 text-neutral-400 max-sm:text-base">
          {description}
        </p>
      </header>

      <ArticleMetadata
        category={category}
        date={date}
        author={author}
      />

      <ArticleStats
        likes={likes}
        shares={shares}
      />
    </div>
  );
};

export const NewsHead = ({
  imageSrc = "https://placehold.co/515x325/ff8c42/ff8c42",
  imageAlt = "",
  title = "Global Climate Summit Addresses Urgent Climate Action",
  description = "World leaders gathered at the Global Climate Summit to discuss urgent climate action, emissions reductions, and renewable energy targets.",
  category = "Environment",
  date = "October 10, 2023",
  author = "Jane Smith",
  likes = "14k",
  shares = "204"
}) => {
  return (
  <article className="box-border flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center g-px  py-8 sm:py-12 md:py-16 w-full border-t border-solid border-t-neutral-800">
    <div className="w-full md:w-1/2">
      <ArticleImage
        src={imageSrc}
        alt={imageAlt}
      />
    </div>

    <div className="w-full md:w-1/2">
      <ArticleContent
        title={title}
        description={description}
        category={category}
        date={date}
        author={author}
        likes={likes}
        shares={shares}
      />
    </div>
  </article>
);

};

export default NewsHead;
