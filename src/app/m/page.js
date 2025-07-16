import Link from "next/link";
import { getLatestPosts } from "./action";
import MostRead from "@/components/mostread/MostRead";

export default async function HomePage() {
    const posts = await getLatestPosts();

    return (
        <section>

            <main className="max-w-3xl mx-auto p-4 space-y-6">
                <h1 className="text-3xl font-bold">Latest Blog Posts</h1>

                {posts.map((post) => (
                    <article key={post._id} className="p-4 border rounded shadow">
                        <Link href={`/blogopen/${post.meta.slug}`}>
                            <h2 className="text-2xl font-semibold hover:underline">
                                {post.meta.title}
                            </h2>
                        </Link>
                        <p className="text-gray-600 mt-2">{post.meta.description}</p>
                        <div className="text-xs text-gray-400 mt-1">
                            Published: {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                    </article>
                ))}
            </main>
            <MostRead />
        </section>

    );
}
