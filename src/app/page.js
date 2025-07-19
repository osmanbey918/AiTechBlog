import { BlogPostCard, BlogPostCardVergeStyle, FeaturedCardan } from "@/components/ai/FeaturedCard";
import PopularArticles from "@/components/blog/PopularArticles";
import MostRead from "@/components/mostread/MostRead";
import NewsHero from "@/components/news/NewsHero";
import NewsSection from "@/components/news/NewsSection";
import VideoSection from "@/components/news/VideoSection";
import NewsLetter from "@/components/NewsLetter";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import { POST_SECTIONS } from "@/constants";
import { getLatestSevenBlogs } from "@/lib/markdown";
import { getAllNews } from "@/lib/news";


export const metadata = {
    title: "AI News Hub - Curated Research and Insights",
    description: "Explore the latest AI insights, curated blogs, and trending topics.",
};

export const revalidate = 1800;

export default async function Page() {
    const blogs = await getLatestSevenBlogs();
    const posts = await getAllNews();

    const popularPosts = posts.slice(POST_SECTIONS.POPULAR.start, POST_SECTIONS.POPULAR.end);
    const morePosts = posts.slice(POST_SECTIONS.MORE.start, POST_SECTIONS.MORE.end);

    return (
        <>
            <NewsHero />
            <NewsSection posts={posts.slice(0,9)}/>

            {/* Featured Articles */}
            <SectionHeader badge="Welcome to Our Knowledge Hub" heading="Explore Curated, Research-Backed Articles" buttonText="View All" />
            <section className="max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-12 g-px">
                <div className="w-full lg:w-2/3">
                    {blogs.map((blog) => (
                        <BlogPostCard key={blog._id} title={blog.meta.title} description={blog.meta.description} date={blog.meta.datePublished} category={blog.meta.category} author={blog.meta.author} image={blog.meta.imageUrl} slug={blog.meta.slug} />
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
                    {posts.map((post) => (
                        <div key={post._id} className="lg:col-span-4">
                            <BlogPostCardVergeStyle type="news" title={post.meta.title} description={post.meta.description} datePublished={post.meta.datePublished} category={post.meta.category} author={post.meta.source} image={post.meta.urlToImage} slug={post.meta.slug} />
                        </div>
                    ))}
                </div>
            </section>
            <SectionHeader heading="Explore More" />

            <section className="g-px grid grid-cols-1 gap-6 py-8 lg:grid-cols-2">
                {posts && posts.slice(0,4).map(post => (
                    <FeaturedCardan key={post.meta.title} type="news" title={post.meta.title} description={post.meta.description} datePublished={post.meta.datePublished} category={post.meta.category} author={post.meta.source} image={post.meta.urlToImage} slug={post.meta.slug} />
                ))}
            </section>


            <div className="border-b border-neutral-800 mb-16"></div>
            <NewsLetter />
        </>
    );

}


