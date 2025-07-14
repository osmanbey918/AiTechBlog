import { BlogCardInvert, FeaturedCardInvert } from "../ai/FeaturedCard";
export default function MostRead({ mostRead, popularPosts }) {
    return (
        <div>
            {mostRead && (
                <section className="py-12 bg-yellow-400 w-full">
                    <div className="g-px">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-4">
                            Most Read
                            <span className="flex-1 h-px bg-gray-950/30"></span>
                        </h2>
                        <FeaturedCardInvert {...mostRead} />
                        <section className="py-12">
                            <div className="w-full">
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {popularPosts.map((post) => (
                                        <BlogCardInvert key={`popular-${post.slug}`} {...post} />
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
