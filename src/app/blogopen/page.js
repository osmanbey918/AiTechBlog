import React from 'react';
// import { BlogHero, BlogContent, BlogSidebar, SimilarNews } from '../../components/blog/p';
import ConnectSection from '@/components/footer/ConnectSection';
import Footer from '@/components/footer/Footer';
import { BlogContent, BlogHero, BlogSidebar, SimilarNews } from '@/components/blog/p';

const page = () => {
    const tableOfContents = [
        'Introduction',
        'AI in Diagnostic Imaging',
        'Predictive Analytics and Disease Prevention',
        'Personalized Treatment Plans',
        'Drug Discovery and Research',
        'AI in Telemedicine',
        'Ethical Considerations',
        'The Future of AI in Healthcare',
        'Conclusion'
    ];

    const similarNewsItems = [
        {
            id: '1',
            image: 'https://placehold.co/400x185/ff6b35/ff6b35',
            title: 'A Decisive Victory for Progressive Policies',
            category: 'Politics',
            likes: '2.2k',
            shares: '60'
        },
        {
            id: '2',
            image: 'https://placehold.co/400x185/0066cc/0066cc',
            title: 'Tech Giants Unveil Cutting-Edge AI Innovations',
            category: 'Technology',
            likes: '6k',
            shares: '92'
        },
        {
            id: '3',
            image: 'https://placehold.co/400x185/4a90e2/4a90e2',
            title: 'COVID-19 Variants',
            category: 'Health',
            likes: '10k',
            shares: '124'
        }
    ];

    return (
        <div className="flex w-full flex-col items-start text-white bg-black  ">
            {/* <BlogHero
                title="The Rise of Artificial Intelligence in Healthcare"
                backgroundImage="https://placehold.co/1440x439/1a1a1a/1a1a1a"
            /> */}
            <div className="flex flex-col md:flex-row-reverse w-full  border-box border-b border-solid border-neutral-800 ">
                <BlogSidebar
                    likes="24.5k"
                    views="50k"
                    shares="206"
                    publicationDate="October 15, 2023"
                    category="Healthcare"
                    readingTime="10 Min"
                    authorName="Dr. Emily Walker"
                    tableOfContents={tableOfContents}
                />
                <BlogContent />
            </div>


            <SimilarNews newsItems={similarNewsItems} />
            <ConnectSection />
            {/* <Footer /> */}
        </div>
    );
};

export default page;
