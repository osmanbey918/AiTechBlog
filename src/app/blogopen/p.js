
// export default function page() {
//   return (
//     <div>

//     </div>
//   )
// }

// function Image() {
//   return (
//     <img
//       src="https://placehold.co/1440x439/1a1a1a/1a1a1a"
//       alt=""
//       className="object-cover absolute top-0 left-0 size-full"
//     />
//   );
// }

// function IntroductionSection({
//   heading = "Introduction",
//   content = "Artificial Intelligence (AI) has emerged as a transformative force in the healthcare industry, reshaping patient care, diagnostics, and research. In this blog post, we explore the profound impact of AI in healthcare, from revolutionizing diagnostic accuracy to enhancing patient outcomes."
// }) {
//   return (
//     <section className="flex flex-col gap-1.5 items-start py-16 pr-16 pl-20 w-full border-t border-b border-solid border-b-[color:var(--Dark-15,#262626)] border-t-[color:var(--Dark-15,#262626)] max-md:py-10 max-md:pr-10 max-md:pl-16 max-sm:px-5 max-sm:py-8">
//       <h2 className="w-full text-xl tracking-tight leading-8 text-white">
//         {heading}
//       </h2>
//       <p className="w-full text-base tracking-tight leading-6 text-neutral-400">
//         {content}
//       </p>
//     </section>
//   );
// }



// export const BlogSection = () => {
//   return (
//     <article className="flex flex-col gap-6 items-start py-16 pr-16 pl-20 w-full border-b border-solid border-b-[color:var(--Dark-15,#262626)] max-md:py-10 max-md:pr-10 max-md:pl-16 max-sm:px-5 max-sm:py-8">
//       <section className="flex flex-col gap-5 items-start w-full">
//         <h1 className="w-full text-2xl tracking-tighter leading-8 text-white">
//           Artificial Intelligence (AI)
//         </h1>
//         <p className="w-full text-base tracking-tight leading-6 text-neutral-400">
//           Artificial Intelligence (AI) has permeated virtually every aspect of
//           our lives, and healthcare is no exception. The integration of AI in
//           healthcare is ushering in a new era of medical practice, where
//           machines complement the capabilities of healthcare professionals,
//           ultimately improving patient outcomes and the efficiency of the
//           healthcare system. In this blog post, we will delve into the diverse
//           applications of AI in healthcare, from diagnostic imaging to
//           personalized treatment plans, and address the ethical considerations
//           surrounding this revolutionary technology.
//         </p>
//         <p className="w-full text-base tracking-tight leading-6 text-neutral-400">
//           Artificial Intelligence (AI) has permeated virtually every aspect of
//           our lives, and healthcare is no exception. The integration of AI in
//           healthcare is ushering in a new era of medical practice, where
//           machines complement the capabilities of healthcare professionals,
//           ultimately improving patient outcomes and the efficiency of the
//           healthcare system. In this blog post, we will delve into the diverse
//           applications of AI in healthcare, from diagnostic imaging to
//           personalized treatment plans, and address the ethical considerations
//           surrounding this revolutionary technology.
//         </p>
//       </section>

//       <section className="flex flex-col gap-2.5 items-start w-full">
//         <h2 className="w-full text-2xl tracking-tighter leading-8 text-white">
//           Predictive Analytics and Disease Prevention
//         </h2>
//         <p className="w-full text-base tracking-tight leading-6 text-neutral-400">
//           One of the most prominent applications of AI in healthcare is in
//           diagnostic imaging. AI algorithms have demonstrated remarkable
//           proficiency in interpreting medical images such as X-rays, MRIs, and
//           CT scans. They can identify anomalies and deviations that might be
//           overlooked by the human eye. This is particularly valuable in early
//           disease detection. For instance, AI can aid radiologists in detecting
//           minute irregularities in mammograms or identifying critical findings
//           in chest X-rays, potentially indicative of life-threatening
//           conditions.
//         </p>
//       </section>

//       <div className="flex flex-col gap-2.5 justify-center items-center px-2.5 pt-16 pb-8 ml-14 h-[215px] w-[758px] max-md:w-full max-sm:px-2.5 max-sm:pt-10 max-sm:pb-5 max-sm:h-auto">
//         <ReadMoreButton />
//       </div>
//     </article>
//   );
// };

// const ReadMoreButton = () => {
//   return (
//     <button className="flex gap-1 items-center px-5 py-3.5 rounded-lg border border-solid cursor-pointer bg-neutral-900 border-[color:var(--Dark-15,#262626)]">
//       <span className="text-sm tracking-tight leading-5 text-neutral-400">
//         Read Full Blog
//       </span>
//       <ArrowIcon />
//     </button>
//   );
// };
"use client";
import { NewsCard } from '@/components/news/NewsSection';
import React from 'react';

// BlogHero Component
export const BlogHero = ({ title, backgroundImage }) => {
    return (
        <section className="h-[439px] w-full relative">
            <img
                src={backgroundImage}
                alt=""
                className="w-full h-full object-cover absolute left-0 top-0"
            />
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
        <div className="flex flex-col items-start gap-5 w-full">
            <div className="flex items-start gap-5 w-full max-sm:flex-col max-sm:gap-[15px]">
                <div className="flex flex-col items-start gap-1.5 flex-1">
                    <h3 className="w-full text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                        Publication Date
                    </h3>
                    <p className="w-full text-white text-base font-normal leading-6 tracking-[-0.48px]">
                        {publicationDate}
                    </p>
                </div>
                <div className="flex flex-col items-start gap-1.5 flex-1">
                    <h3 className="w-full text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                        Category
                    </h3>
                    <p className="w-full text-white text-base font-normal leading-6 tracking-[-0.48px]">
                        {category}
                    </p>
                </div>
            </div>
            <div className="flex items-start gap-5 w-full max-sm:flex-col max-sm:gap-[15px]">
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
        <div className="flex items-center gap-3.5 w-full border-t-[color:var(--Dark-15,#262626)] pl-[60px] pr-20 py-10 border-t border-solid max-sm:px-5 max-sm:py-[30px]">
            <button className="flex justify-center items-center gap-1 border border-[color:var(--Dark-15,#262626)] bg-[#141414] px-3.5 py-2 rounded-[100px] border-solid hover:bg-[#1a1a1a] transition-colors">
                <div>+</div>
                <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
                    {likes}
                </span>
            </button>

            <button className="flex justify-center items-center gap-1 border border-[color:var(--Dark-15,#262626)] bg-[#141414] px-3.5 py-2 rounded-[100px] border-solid hover:bg-[#1a1a1a] transition-colors">
                <div>+</div>
                <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
                    {views}
                </span>
            </button>

            <button className="flex justify-center items-center gap-1 border border-[color:var(--Dark-15,#262626)] bg-[#141414] px-3.5 py-2 rounded-[100px] border-solid hover:bg-[#1a1a1a] transition-colors">
                <div>+</div>
                <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
                    {shares}
                </span>
            </button>
        </div>
    );
};

export const TableOfContents = ({ items }) => {
    return (
        <nav className="flex flex-col items-start gap-3.5 w-full">
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
        <aside className="flex w-[570px] flex-col items-start border-b-[color:var(--Dark-15,#262626)] border-l-[color:var(--Dark-15,#262626)] border-b border-solid border-l max-md:w-full max-md:border-l-[none]">
            <EngagementMetrics likes={likes} views={views} shares={shares} />

            <div className="flex flex-col items-start gap-10 w-full border-t-[color:var(--Dark-15,#262626)] pl-[60px] pr-20 py-[60px] border-t border-solid max-md:pl-10 max-md:pr-[60px] max-md:py-10 max-sm:px-5 max-sm:py-[30px]">
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
export const BlogContent = () => {
    return (
        <main className="flex flex-col items-end flex max-md:w-full g-px">
            <section className="flex flex-col items-start gap-1.5 border-t-[color:var(--Dark-15,#262626)] border-b-[color:var(--Dark-15,#262626)]  border-t border-solid border-b py-8">
                <h2 id="introduction" className="text-white text-xl font-normal leading-[30px] tracking-[-0.6px]">
                    Introduction
                </h2>
                <p className=" text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                    Artificial Intelligence (AI) has emerged as a transformative force in the healthcare industry, reshaping patient care, diagnostics, and research. In this blog post, we explore the profound impact of AI in healthcare, from revolutionizing diagnostic accuracy to enhancing patient outcomes.
                </p>
            </section>

            <section className="flex flex-col items-start gap-6  border-b-[color:var(--Dark-15,#262626)]  border-b border-solid py-8">
                <div className="flex flex-col items-start gap-5 ">
                    <h2 id="artificial-intelligence-ai" className=" text-white text-[22px] font-normal leading-[33px] tracking-[-0.66px]">
                        Artificial Intelligence (AI)
                    </h2>
                    <p className=" text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                        Artificial Intelligence (AI) has permeated virtually every aspect of our lives, and healthcare is no exception. The integration of AI in healthcare is ushering in a new era of medical practice, where machines complement the capabilities of healthcare professionals, ultimately improving patient outcomes and the efficiency of the healthcare system. In this blog post, we will delve into the diverse applications of AI in healthcare, from diagnostic imaging to personalized treatment plans, and address the ethical considerations surrounding this revolutionary technology.
                    </p>
                    <p className=" text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                        Artificial Intelligence (AI) has permeated virtually every aspect of our lives, and healthcare is no exception. The integration of AI in healthcare is ushering in a new era of medical practice, where machines complement the capabilities of healthcare professionals, ultimately improving patient outcomes and the efficiency of the healthcare system. In this blog post, we will delve into the diverse applications of AI in healthcare, from diagnostic imaging to personalized treatment plans, and address the ethical considerations surrounding this revolutionary technology.
                    </p>
                </div>

                <div className="flex flex-col items-start gap-2.5 ">
                    <h3 id="predictive-analytics-and-disease-prevention" className=" text-white text-[22px] font-normal leading-[33px] tracking-[-0.66px]">
                        Predictive Analytics and Disease Prevention
                    </h3>
                    <p className=" text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                        One of the most prominent applications of AI in healthcare is in diagnostic imaging. AI algorithms have demonstrated remarkable proficiency in interpreting medical images such as X-rays, MRIs, and CT scans. They can identify anomalies and deviations that might be overlooked by the human eye. This is particularly valuable in early disease detection. For instance, AI can aid radiologists in detecting minute irregularities in mammograms or identifying critical findings in chest X-rays, potentially indicative of life-threatening conditions.
                    </p>
                </div>

                {/* <div className="flex w-[758px] h-[215px] flex-col justify-center items-center gap-2.5 ml-14 pt-[60px] pb-[30px] px-2.5 max-md:w-full max-sm:h-auto max-sm:pt-10 max-sm:pb-5 max-sm:px-2.5">
                    <button className="flex items-center gap-1 border border-[color:var(--Dark-15,#262626)] cursor-pointer bg-[#141414] px-5 py-3.5 rounded-lg border-solid hover:bg-[#1a1a1a] transition-colors">
                        <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
                            Read Full Blog
                        </span>
                        <div>+</div>
                    </button>
                </div> */}
            </section>
        </main>
    );
};

// NewsCard Component
// export const NewsCard = ({ image, title, category, likes, shares }) => {
//     return (
//         <article className="flex flex-col justify-center items-start gap-4 flex-1">
//             <img
//                 src={image}
//                 alt={title}
//                 className="h-[185px] w-full object-cover rounded-[10px]"
//             />
//             <div className="flex flex-col items-start gap-4 w-full">
//                 <div className="flex flex-col items-start gap-1 w-full">
//                     <h3 className="w-full text-white text-base font-bold leading-6 tracking-[-0.48px]">
//                         {title}
//                     </h3>
//                     <p className="w-full text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
//                         {category}
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-[50px] w-full max-sm:flex-col max-sm:gap-[15px] max-sm:items-start">
//                     <div className="flex items-start gap-2 max-sm:w-full">
//                         <button className="flex justify-center items-center gap-1 border border-[color:var(--Dark-15,#262626)] bg-[#1A1A1A] px-3.5 py-1.5 rounded-[100px] border-solid hover:bg-[#262626] transition-colors">
//                             <div>+</div>
//                             <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
//                                 {likes}
//                             </span>
//                         </button>
//                         <button className="flex justify-center items-center gap-1 border border-[color:var(--Dark-15,#262626)] bg-[#1A1A1A] px-3.5 py-1.5 rounded-[100px] border-solid hover:bg-[#262626] transition-colors">
//                             <div>+</div>
//                             <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
//                                 {shares}
//                             </span>
//                         </button>
//                     </div>
//                     <button className="flex justify-center items-center gap-1 flex-1 border border-[color:var(--Dark-15,#262626)] cursor-pointer bg-[#141414] px-5 py-3.5 rounded-lg border-solid max-sm:w-full hover:bg-[#1a1a1a] transition-colors">
//                         <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
//                             Read More
//                         </span>
//                         <div>+</div>
//                     </button>
//                 </div>
//             </div>
//         </article>
//     );
// };

// SimilarNews Component
export const SimilarNews = ({ newsItems }) => {
    return (
        <section className="w-full g-px py-20 border-t border-solid border-neutral-800 sm:py-12  md:py-8 ">
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

            {/* <section className="w-full g-px py-8 border-t border-solid border-neutral-800 sm:px-6 sm:py-12  md:py-16 "> */}
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
            {/* </section> */}
        </section>
    );
};