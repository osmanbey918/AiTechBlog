import { BlogPostCard, BlogPostCardVergeStyle, FeaturedCardan } from "@/components/ai/FeaturedCard";
import PopularArticles from "@/components/blog/PopularArticles";
import MostRead from "@/components/mostread/MostRead";
import NewsHero from "@/components/news/NewsHero";
import NewsSection from "@/components/news/NewsSection";
import VideoSection from "@/components/news/VideoSection";
import NewsLetter from "@/components/NewsLetter";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import { POST_SECTIONS } from "@/constants";
import { getAllPost } from "@/lib/markdown";


export const metadata = {
    title: "AI News Hub - Curated Research and Insights",
    description: "Explore the latest AI insights, curated blogs, and trending topics.",
};

export const revalidate = 1800;

export default async function Page() {

    // Fetch and sort all posts
    const posts = await getAllPost();
    console.log(posts);

    // Get different sections of posts using constants
    const mainPosts = posts.slice(POST_SECTIONS.MAIN.start, POST_SECTIONS.MAIN.end);
    const popularPosts = posts.slice(POST_SECTIONS.POPULAR.start, POST_SECTIONS.POPULAR.end);
    const morePosts = posts.slice(POST_SECTIONS.MORE.start, POST_SECTIONS.MORE.end);

    return (
        <>
            <NewsHero />
            <NewsSection />

            {/* Featured Articles */}
            <SectionHeader badge="Welcome to Our Knowledge Hub" heading="Explore Curated, Research-Backed Articles" buttonText="View All" />
            <section className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 g-px">
                <div className="w-full lg:w-2/3">
                    {mainPosts.map((blog) => (
                        <BlogPostCard key={blog.title} title={blog.title} description={blog.description} date={blog.datePublished} category={blog.category} author={blog.source.name} image={blog.urlToImage} slug={blog.slug} />
                    ))}
                </div>
                <aside className="w-full lg:w-1/3 mt-8 lg:mt-0">
                    <PopularArticles />
                </aside>
            </section>

            {/* Video Section */}
            <section className="mb-16">
                <SectionHeader badge="Featured Videos" heading="Engaging Visual Insights for Modern Audiences" buttonText="View All" />
                <VideoSection />
            </section>

            {/* Trending Section */}
            <section className="mb-16">
                <SectionHeader badge="Most Favorites" heading="This Week&apos;s Trending Articles" />
                <MostRead />
            </section>

            {/* More Articles */}
            <section className="g-px mb-16">
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-xl font-semibold text-white">More For You</h2>
                    <span className="flex-1 h-px bg-neutral-800"></span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {morePosts.map((post) => (
                        <div key={post.title} className="lg:col-span-4">
                            <BlogPostCardVergeStyle title={post.title} description={post.description} datePublished={post.datePublished} category={post.category} author={post.source.name} image={post.urlToImage} slug={post.slug} />
                        </div>
                    ))}
                </div>
            </section>
            <SectionHeader heading="Explore More" />

            <section className="g-px grid grid-cols-1 gap-6 py-8 lg:grid-cols-2">
                {popularPosts && popularPosts.map(post => (
                    <FeaturedCardan key={post.title} title={post.title} description={post.description} datePublished={post.datePublished} category={post.category} author={post.source.name} image={post.urlToImage} slug={post.slug} />
                ))}
            </section>


            <div className="border-b border-neutral-800 mb-16"></div>
            <NewsLetter />
        </>
    );

}


