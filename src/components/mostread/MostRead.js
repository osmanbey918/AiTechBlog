import { getPopularPosts } from "@/app/m/action";
import { BlogCardInvert, FeaturedCardInvert } from "../ai/FeaturedCard";
export default async function MostRead() {
    const posts = await getPopularPosts();
    const mostRead = posts[0].meta;
    const mostReadd = posts[0];
    const popularPosts = posts.slice(1, 5)

    return (
        <div>
            {mostRead && (
                <section className="py-12 bg-yellow-400 w-full">
                    <div className="g-px">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-4">
                            Most Read
                            <span className="flex-1 h-px bg-gray-950/30"></span>
                        </h2>
                        <FeaturedCardInvert title={mostRead.title} slug={mostRead.slug} image={mostRead.imageUrl} description={mostRead.description} author={mostRead.author} date={mostReadd.createdAt} />
                        <section className="py-12">
                            <div className="w-full">
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {popularPosts && popularPosts.map((post) => (
                                        <BlogCardInvert key={`popular-${post.meta.slug}`} title={post.meta.title} slug={post.meta.slug} image={post.meta.imageUrl} description={post.meta.description} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            )}

        </div>
    )
}
