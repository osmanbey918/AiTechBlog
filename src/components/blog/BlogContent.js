"use client";
import React from 'react';
import { BlogHero } from './p';

const BlogContent = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const contentRef = React.useRef(null);
    const [showReadMore, setShowReadMore] = React.useState(false);

    React.useEffect(() => {
        const checkHeight = () => {
            if (contentRef.current) {
                const contentHeight = contentRef.current.scrollHeight;
                setShowReadMore(contentHeight > 500);
            }
        };

        checkHeight();
        window.addEventListener('resize', checkHeight);
        return () => window.removeEventListener('resize', checkHeight);
    }, []);

    return (
        <main className="flex flex-col items-end flex max-md:w-full border-t-[color:var(--Dark-15,#262626)] border-b-[color:var(--Dark-15,#262626)] border-t border-solid ">
            <div
                ref={contentRef}
                className={`blog-content max-md:max-w-full ${!isExpanded ? 'collapsed' : ''}`}
            >
                <section className="flex flex-col items-start g-px gap-1.5 border-b-[color:var(--Dark-15,#262626)]  border-b border-solid py-16">
                    <h2 id="introduction" className="text-white text-xl font-normal leading-[30px] tracking-[-0.6px]">
                        Introduction
                    </h2>
                    <p className="text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                        Artificial Intelligence (AI) has emerged as a transformative force in the healthcare industry, reshaping patient care, diagnostics, and research. In this blog post, we explore the profound impact of AI in healthcare, from revolutionizing diagnostic accuracy to enhancing patient outcomes.
                    </p>
                </section>

                <section className="flex flex-col items-start g-px gap-6 pt-16">
                    <div className="flex flex-col items-start gap-5">
                        <h2 id="artificial-intelligence-ai" className="text-white text-[22px] font-normal leading-[33px] tracking-[-0.66px]">
                            Artificial Intelligence (AI)
                        </h2>
                        <p className="text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                            Artificial Intelligence (AI) has permeated virtually every aspect of our lives, and healthcare is no exception. The integration of AI in healthcare is ushering in a new era of medical practice, where machines complement the capabilities of healthcare professionals, ultimately improving patient outcomes and the efficiency of the healthcare system. In this blog post, we will delve into the diverse applications of AI in healthcare, from diagnostic imaging to personalized treatment plans, and address the ethical considerations surrounding this revolutionary technology.
                        </p>
                        <p className="text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                            Artificial Intelligence (AI) has permeated virtually every aspect of our lives, and healthcare is no exception. The integration of AI in healthcare is ushering in a new era of medical practice, where machines complement the capabilities of healthcare professionals, ultimately improving patient outcomes and the efficiency of the healthcare system. In this blog post, we will delve into the diverse applications of AI in healthcare, from diagnostic imaging to personalized treatment plans, and address the ethical considerations surrounding this revolutionary technology.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-2.5">
                        <h3 id="predictive-analytics-and-disease-prevention" className="text-white text-[22px] font-normal leading-[33px] tracking-[-0.66px]">
                            Predictive Analytics and Disease Prevention
                        </h3>
                        <p className="text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                            One of the most prominent applications of AI in healthcare is in diagnostic imaging. AI algorithms have demonstrated remarkable proficiency in interpreting medical images such as X-rays, MRIs, and CT scans. They can identify anomalies and deviations that might be overlooked by the human eye. This is particularly valuable in early disease detection. For instance, AI can aid radiologists in detecting minute irregularities in mammograms or identifying critical findings in chest X-rays, potentially indicative of life-threatening conditions.
                        </p>
                        <p className="text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                            One of the most prominent applications of AI in healthcare is in diagnostic imaging. AI algorithms have demonstrated remarkable proficiency in interpreting medical images such as X-rays, MRIs, and CT scans. They can identify anomalies and deviations that might be overlooked by the human eye. This is particularly valuable in early disease detection. For instance, AI can aid radiologists in detecting minute irregularities in mammograms or identifying critical findings in chest X-rays, potentially indicative of life-threatening conditions.
                        </p>
                        <p className="text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                            One of the most prominent applications of AI in healthcare is in diagnostic imaging. AI algorithms have demonstrated remarkable proficiency in interpreting medical images such as X-rays, MRIs, and CT scans. They can identify anomalies and deviations that might be overlooked by the human eye. This is particularly valuable in early disease detection. For instance, AI can aid radiologists in detecting minute irregularities in mammograms or identifying critical findings in chest X-rays, potentially indicative of life-threatening conditions.
                        </p>
                        <p className="text-[#98989A] text-base font-normal leading-6 tracking-[-0.48px]">
                            One of the most prominent applications of AI in healthcare is in diagnostic imaging. AI algorithms have demonstrated remarkable proficiency in interpreting medical images such as X-rays, MRIs, and CT scans. They can identify anomalies and deviations that might be overlooked by the human eye. This is particularly valuable in early disease detection. For instance, AI can aid radiologists in detecting minute irregularities in mammograms or identifying critical findings in chest X-rays, potentially indicative of life-threatening conditions.
                        </p>
                    </div>
                </section>

                {showReadMore && !isExpanded && (
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 border border-[color:var(--Dark-15,#262626)] cursor-pointer bg-[#141414] px-5 py-3.5 rounded-lg border-solid hover:bg-[#1a1a1a] transition-colors"
                    >
                        <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
                            Read Full Blog
                        </span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="text-[#98989A]"
                        >
                            <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}

                {isExpanded && (
                    <div className="flex justify-center py-8">
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="flex items-center gap-2 border border-[color:var(--Dark-15,#262626)] cursor-pointer bg-[#141414] px-5 py-3.5 rounded-lg border-solid hover:bg-[#1a1a1a] transition-colors"
                        >
                            <span className="text-[#98989A] text-sm font-normal leading-[21px] tracking-[-0.42px]">
                                Show Less
                            </span>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="text-[#98989A] transform rotate-180"
                            >
                                <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default BlogContent;
