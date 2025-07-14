import BlogPostCard, { BlogPostCardVergeStyle } from "@/components/home/blogPost/BlogPostCard";
import MostRead from "@/components/mostread/MostRead";
import NewsHero from "@/components/news/NewsHero";
import NewsSection from "@/components/news/NewsSection";
import VideoSection from "@/components/news/VideoSection";
import NewsLetter from "@/components/NewsLetter";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';
import { Metadata } from "next";

export const metadata = {
    title: "AI News Hub - Curated Research and Insights",
    description: "Explore the latest AI insights, curated blogs, and trending topics.",
};

export const revalidate = 1800; // revalidate every 30 minutes

export default async function Page() {
    try {
        // Fetch all slugs and posts
        const slugs = await getAllPostSlugs();
        const posts = await Promise.all(
            slugs.map(async (slug) => {
                const post = await getPostBySlug(slug);
                return {
                    slug,
                    title: post.meta.title,
                    image: post.meta.coverImage || '/assets/default-cover.jpg',
                    description: post.meta.excerpt,
                    category: post.meta.category || "AI",
                    author: post.meta.jsonld?.author?.name || "Anonymous",
                    authorImage: post.meta.authorImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.meta.jsonld?.author?.name || 'anonymous'}`,
                    authorSpecialty: post.meta.category || "Technology",
                    date: post.meta.jsonld?.datePublished || new Date().toISOString(),
                    metrics: {
                        views: Math.floor(Math.random() * 1000),
                        comments: Math.floor(Math.random() * 50),
                        shares: Math.floor(Math.random() * 100)
                    },
                    stats: {
                        views: Math.floor(Math.random() * 1000),
                        comments: Math.floor(Math.random() * 50),
                        shares: Math.floor(Math.random() * 100)
                    },
                    publishDate: post.meta.jsonld?.datePublished || new Date().toISOString()
                };
            })
        );

        // Sort posts by date
        const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Get different sections of posts
        const mainPosts = sortedPosts.slice(0, 7);
        const popularPosts = sortedPosts.slice(12, 16);
        const mostRead = sortedPosts[18] || sortedPosts[0]; // Fallback to first post if 18th doesn't exist
        const morePosts = sortedPosts.slice(7, 13);

        return (
            <>
                <NewsHero />
                <NewsSection />
                
                {/* Featured Articles */}
                <section className="mb-16">
                    <SectionHeader
                        badge="Welcome to Our Knowledge Hub"
                        heading="Explore Curated, Research-Backed Articles"
                        buttonText="View All"
                    />
                    <div className="g-px px-4 py-12 grid grid-cols-1 gap-8">
                        {mainPosts.map((blog, i) => (
                            <BlogPostCardVergeStyle 
                                key={blog.slug} 
                                {...blog}
                            />
                        ))}
                    </div>
                </section>

                {/* Video Section */}
                <section className="mb-16">
                    <SectionHeader
                        badge="Featured Videos"
                        heading="Engaging Visual Insights for Modern Audiences"
                        buttonText="View All"
                    />
                    <VideoSection />
                </section>

                {/* Trending Section */}
                <section className="mb-16">
                    <SectionHeader
                        badge="Most Favorites"
                        heading="This Week&apos;s Trending Articles"
                    />
                    <MostRead mostRead={mostRead} popularPosts={popularPosts} />
                </section>

                {/* More Articles */}
                <section className="g-px mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl font-semibold text-white">More For You</h2>
                        <span className="flex-1 h-px bg-neutral-800"></span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {morePosts.map((post) => (
                            <div key={post.slug} className="lg:col-span-4">
                                <BlogPostCard {...post} />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="border-b border-neutral-800 mb-16"></div>
                <NewsLetter />
            </>
        );
    } catch (error) {
        console.error('Error loading page:', error);
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
                    <p className="text-neutral-400">We&apos;re having trouble loading the content. Please try again later.</p>
                </div>
            </div>
        );
    }
}


