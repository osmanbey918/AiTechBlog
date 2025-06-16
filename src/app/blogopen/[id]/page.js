import React from 'react';
import ConnectSection from '@/components/footer/ConnectSection';
import Footer from '@/components/footer/Footer';
import { BlogContent, BlogHero, BlogMetadata, BlogSidebar, SimilarNews } from '@/components/blog/p';
const blogData = [
    {
        id: '1',
        title: "...",
        publicationDate: "...",
        contentSections: [
            {
                heading: "Introduction",
                paragraphs: [
                    "AI has emerged as a transformative force...",
                    "In this blog post, we explore the impact..."
                ]
            },
            {
                heading: "Predictive Analytics and Disease Prevention",
                paragraphs: [
                    "AI algorithms have demonstrated proficiency...",
                    "Particularly valuable in early disease detection..."
                ]
            }
        ],
        tableOfContents: [
            'Introduction',
            'AI in Diagnostic Imaging',
            'Predictive Analytics and Disease Prevention',
            'Personalized Treatment Plans',
            'Drug Discovery and Research',
            'AI in Telemedicine',
            'Ethical Considerations',
            'The Future of AI in Healthcare',
            'Conclusion'
        ]


    }
]

// ✅ Simulated "fetch" function (in real world, call your DB/API here)
async function getBlogDataById(id) {
    return blogData.find(blog => blog.id === id);
}

export default async function BlogOpenPage({ params }) {
    const { id } = params;
    const blog = await getBlogDataById(id);

    if (!blog) {
        return <div>Blog not found.</div>;
    }

    return (
        <div className="flex w-full flex-col items-start text-white bg-black">
            <BlogHero title={blog.title} backgroundImage={blog.backgroundImage} />
            <div className="flex justify-between w-full max-w-[1440px] mx-auto py-16 gap-16 max-lg:px-8 max-lg:flex-col">
                <article className="flex-1">
                    <BlogContent contentSections={blog.contentSections} />
                    <BlogMetadata
                        publicationDate={blog.publicationDate}
                        category={blog.category}
                        readingTime={blog.readingTime}
                        authorName={blog.authorName}
                    />
                </article>

                <aside className="w-[400px] max-lg:w-full">
                    <BlogSidebar tableOfContents={blog.tableOfContents} />
                </aside>
            </div>

            <SimilarNews newsItems={[]} />
        </div>
    );
}


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





const contentSections = [
    {
        heading: "Introduction",
        paragraphs: [
            "Artificial Intelligence (AI) has emerged as a transformative force...",
            "In this blog post, we explore the profound impact..."
        ]
    },
    {
        heading: "Predictive Analytics and Disease Prevention",
        paragraphs: [
            "One of the most prominent applications of AI in healthcare...",
            "AI algorithms have demonstrated remarkable proficiency..."
        ]
    }
];
