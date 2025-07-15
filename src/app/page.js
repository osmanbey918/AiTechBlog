import BlogPostCard, { BlogPostCardVergeStyle } from "@/components/home/blogPost/BlogPostCard";
import MostRead from "@/components/mostread/MostRead";
import NewsHero from "@/components/news/NewsHero";
import NewsSection from "@/components/news/NewsSection";
import VideoSection from "@/components/news/VideoSection";
import NewsLetter from "@/components/NewsLetter";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import { postService } from '@/services/posts';
import { POST_SECTIONS } from '@/constants';

export const metadata = {
    title: "AI News Hub - Curated Research and Insights",
    description: "Explore the latest AI insights, curated blogs, and trending topics.",
};

export const revalidate = 1800;

export default async function Page() {
    try {
        // Fetch and sort all posts
        const posts = await postService.getAllPosts();
        console.log(posts);

        // Get different sections of posts using constants
        const mainPosts = posts.slice(POST_SECTIONS.MAIN.start, POST_SECTIONS.MAIN.end);
        const popularPosts = posts.slice(POST_SECTIONS.POPULAR.start, POST_SECTIONS.POPULAR.end);
        const mostRead = posts[18] || posts[0]; // Fallback to first post if 18th doesn't exist
        const morePosts = posts.slice(POST_SECTIONS.MORE.start, POST_SECTIONS.MORE.end);

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
                        {mainPosts.map((blog) => (
                            <BlogPostCardVergeStyle
                                key={blog.slug}
                                title={blog.title}
                                description={blog.description}
                                datePublished={blog.datePublished}
                                category={blog.category}
                                author={blog.author}
                                image={blog.image}
                                slug={blog.slug}
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
                                <BlogPostCard
                                    title={post.title}
                                    description={post.description}
                                    datePublished={post.datePublished}
                                    category={post.category}
                                    author={post.author}
                                    image={post.image}
                                    slug={post.slug}
                                />
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


