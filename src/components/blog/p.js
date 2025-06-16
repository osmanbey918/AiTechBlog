"use client";
import { NewsCard } from '@/components/news/NewsSection';
import Image from 'next/image';
import React from 'react';

// BlogHero Component
export const BlogHero = ({ title, backgroundImage }) => {
    return (
        <section className="h-[439px] w-full relative">
            {/* <Image
                src={backgroundImage}
                alt='hello'
                width={100}
                height={100}
                className="w-full h-full object-cover absolute left-0 top-0"
            /> */}
            {/* <h1 className="text-white text-center text-[44px] font-bold leading-[66px] tracking-[-1.32px] absolute -translate-x-2/4 w-[918px] h-[66px] left-2/4 top-[338px] max-md:text-4xl max-md:w-[90%] max-sm:text-[28px] max-sm:w-[95%] max-sm:px-5 max-sm:py-0">
                {title}
            </h1> */}
        </section>
    );
};

// BlogMetadata Component
export const BlogMetadata = ({
    publicationDate,
    category,
    readingTime,
    authorName
}) => {
    return (
        <div className="flex flex-col items-start w-full gap-6 max-sm:gap-4 ">
            {/* Row 1 */}
            <div className="flex items-start w-full gap-5  max-sm:gap-3">
                <div className="flex flex-col items-start gap-1.5 flex-1">
                    <h3 className=" text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                        Publication Date
                    </h3>
                    <p className=" text-white text-base font-normal leading-6 tracking-[-0.48px]">
                        {publicationDate}
                    </p>
                </div>
                <div className="flex flex-col items-start gap-1.5 flex-1">
                    <h3 className=" text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                        Category
                    </h3>
                    <p className=" text-white text-base font-normal leading-6 tracking-[-0.48px]">
                        {category}
                    </p>
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-start w-full gap-5  max-sm:gap-3">
                <div className="flex flex-col items-start gap-1.5 flex-1">
                    <h3 className="w-full text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                        Reading Time
                    </h3>
                    <p className="w-full text-white text-base font-normal leading-6 tracking-[-0.48px]">
                        {readingTime}
                    </p>
                </div>
                <div className="flex flex-col items-start gap-1.5 flex-1">
                    <h3 className="w-full text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                        Author Name
                    </h3>
                    <p className="w-full text-white text-base font-normal leading-6 tracking-[-0.48px]">
                        {authorName}
                    </p>
                </div>
            </div>
        </div>

    );
};

// EngagementMetrics Component
export const EngagementMetrics = ({ likes, views, shares }) => {
    return (
        <div className="flex items-center gap-3.5 w-full border-t-[color:var(--Dark-15,#262626)]  max-md:px-16 max-sm:px-4 px-12 pr-20 py-10 border-t border-solid  max-sm:py-[30px]">
            <button className="flex justify-center items-center gap-1 border border-[color:var(--Dark-15,#262626)] bg-[#141414] px-3.5 py-2 rounded-[100px] border-solid hover:bg-[#1a1a1a] transition-colors">
                <Image src="/assets/like.svg" width={20} height={20} alt='like'/>
                <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
                    {likes}
                </span>
            </button>

            <button className="flex justify-center items-center gap-1 border border-[color:var(--Dark-15,#262626)] bg-[#141414] px-3.5 py-2 rounded-[100px] border-solid hover:bg-[#1a1a1a] transition-colors">
                <Image src="/assets/comment.svg" width={20} height={20} alt='comment'/>
                <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
                    {views}
                </span>
            </button>

            <button className="flex justify-center items-center gap-1 border border-[color:var(--Dark-15,#262626)] bg-[#141414] px-3.5 py-2 rounded-[100px] border-solid hover:bg-[#1a1a1a] transition-colors">
                <Image src="/assets/share.svg" width={20} height={20} alt='share'/>
                <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
                    {shares}
                </span>
            </button>
        </div>
    );
};

export const TableOfContents = ({ items }) => {
    return (
        <nav className="flex flex-col items-start gap-3.5 w-full pb-12">
            <h3 className="w-full text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                Table of Contents
            </h3>
            <div className="flex flex-col items-start gap-4 w-full bg-[#1A1A1A] p-[18px] rounded-[10px]">
                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleItemClick(item)}
                        className="w-full text-left text-white text-base font-normal leading-6 tracking-[-0.48px] hover:text-[#FFD11A] transition-colors cursor-pointer"
                    >
                        <span className="inline-block w-2 h-2 mr-3 bg-[#98989A] rounded-full"></span>
                        {item}
                    </button>
                ))}
            </div>
        </nav>
    );
};

// BlogSidebar Component
export const BlogSidebar = ({
    likes,
    views,
    shares,
    publicationDate,
    category,
    readingTime,
    authorName,
    tableOfContents
}) => {
    return (
        <aside className="flex w-[570px]  flex-col items-start border-b-[color:var(--Dark-15,#262626)] border-l-[color:var(--Dark-15,#262626)] border-b border-solid border-l max-md:w-full max-md:border-l-[none]">

            <EngagementMetrics likes={likes} views={views} shares={shares} />
            <div className="flex pr-16 max-lg:pr-16 pb-16 max-md:px-16 max-sm:px-4 px-12 flex-col items-start gap-10 w-full border-t-[color:var(--Dark-15,#262626)]  py-[60px] border-t border-solid max-md:py-10 max-sm:py-[30px]">
                <BlogMetadata
                    publicationDate={publicationDate}
                    category={category}
                    readingTime={readingTime}
                    authorName={authorName}
                />

                <TableOfContents items={tableOfContents} />
            </div>
        </aside>
    );
};

// BlogContent Component
export { default as BlogContent } from '@/components/blog/BlogContent';


// SimilarNews Component
export const SimilarNews = ({ newsItems }) => {
    return (
        <section className="w-full g-px py-20 sm:py-12  md:py-8 ">
            <div className="flex items-center gap-20 w-full max-md:gap-10 max-sm:flex-col max-sm:gap-5 max-sm:items-start">
                <h2 className="flex-1 text-[#CCC] text-[22px] font-normal leading-[28.6px] tracking-[-0.66px]">
                    Similar News
                </h2>
                <button className="flex items-center gap-1 border border-[color:var(--Dark-15,#262626)] cursor-pointer bg-[#141414] px-5 py-3.5 rounded-lg border-solid max-sm:self-start hover:bg-[#1a1a1a] transition-colors">
                    <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
                        View All News
                    </span>
                    <div>+</div>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-10">
                {newsItems.map((article) => (
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
            </div>
        </section>
    );
};