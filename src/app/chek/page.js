import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';

export default async function ArticlesPage() {
  const slugs = getAllPostSlugs();

 const posts = await Promise.all(
  slugs.map(async (slug) => {
    const post = await getPostBySlug(slug);
    return {
      slug,
      title: post.meta.title,
      image: post.meta.coverImage || null,
    };
  })
);


  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-7xl mx-auto px-4 py-10">
      {posts.map((post) => (
        <a
          key={post.slug}
          href={`/blogopen/${post.slug}`}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-transform hover:-translate-y-1 overflow-hidden"
        >
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-slate-800">{post.title}</h3>
          </div>
        </a>
      ))}
    </div>
  );
}
