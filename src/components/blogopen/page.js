import React from 'react';
import ConnectSection from '@/components/footer/ConnectSection';
import Footer from '@/components/footer/Footer';
import { BlogContent, BlogHero, BlogMetadata, BlogSidebar, SimilarNews } from '@/components/blog/p';

// ✅ ✅ Move mock data outside the component for stable production build

const blogData = {
    title: "The Rise of Artificial Intelligence in Healthcare",
    publicationDate: "June 15, 2025",
    category: "Healthcare & Technology",
    readingTime: "8 min read",
    authorName: "Dr. Sarah Johnson",
    backgroundImage: "https://placehold.co/1200x400/2a2a2a/2a2a2a"
};

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
        shares: '60',
        date: 'June 14, 2025'
    },
    {
        id: '2',
        image: 'https://placehold.co/400x185/0066cc/0066cc',
        title: 'Tech Giants Unveil Cutting-Edge AI Innovations',
        category: 'Technology',
        likes: '6k',
        shares: '92',
        date: 'June 13, 2025'
    },
    {
        id: '3',
        image: 'https://placehold.co/400x185/4a90e2/4a90e2',
        title: 'COVID-19 Variants',
        category: 'Health',
        likes: '10k',
        shares: '124',
        date: 'June 12, 2025'
    }
];

// ✅ Use PascalCase for your page component
const BlogOpenPage = () => {
    return (
        <div className="flex w-full flex-col items-start text-white bg-black">
            <BlogHero
                title={blogData.title}
                backgroundImage={blogData.backgroundImage}
            />
            <div className="flex justify-between w-full max-w-[1440px] mx-auto py-16 gap-16 max-lg:px-8 max-lg:flex-col">
                <article className="flex-1">
                    <BlogContent />
                    <BlogMetadata
                        publicationDate={blogData.publicationDate}
                        category={blogData.category}
                        readingTime={blogData.readingTime}
                        authorName={blogData.authorName}
                    />
                </article>
                <aside className="w-[400px] max-lg:w-full">
                    {/* ✅ Add optional chaining to avoid undefined errors */}
                    <BlogSidebar tableOfContents={tableOfContents ?? []} />
                </aside>
            </div>
            <SimilarNews items={similarNewsItems ?? []} />
            <ConnectSection />
            <Footer />
        </div>
    );
};

export default BlogOpenPage;
