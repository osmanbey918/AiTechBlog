import FeaturedCard from "@/components/ai/FeaturedCard";
import JsonLdBlogList from "@/components/JsonLdBlogList";
import Search from "@/components/search";
import { getAllPostSlugs, getPostBySlug } from "@/lib/markdown";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getAllAiPrompts } from '@/lib/markdown';
import PromptGrid from '@/components/ai/PromptGrid';

export default async function Page() {
  const slugs = getAllPostSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return {
        slug,
        title: post.meta.title,
        image: post.meta.coverImage || null,
        des: post.meta.excerpt,
        category: post.meta.category || "General",
      };
    })
  );

  const featured = posts.slice(0, 1)[0]; // First one as featured
  const rest = posts.slice(1);

  const prompts = await getAllAiPrompts();
  
  return (
    <>
      <JsonLdBlogList posts={posts} />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-black to-neutral-900 text-white py-20 text-center">
        <div className="container mx-auto g-px max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore the World of AI & Tech
          </h1>
          <p className="text-lg text-neutral-300 mb-6">
            Stay ahead with in-depth blogs, tutorials, and industry updates.
          </p>
          <Suspense
            fallback={
              <div className="w-full max-w-[60%] mx-auto h-[42px] bg-black/50 animate-pulse rounded-md border border-gray-200"></div>
            }
          >
            <Search />
          </Suspense>
        </div>
      </section>

      {/* Featured Blog */}
      {featured && (
        <section className="py-12 g-px max-w-5xl">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Blog</h2>
          <FeaturedCard {...featured} />
        </section>
      )}

      {/* Blog Listing */}
      <section className="w-full g-px py-12 border-t border-neutral-800">
        <h2 className="text-xl font-semibold text-white mb-6">
          Latest Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </section>

      {/* Popular Section (Placeholder) */}
      <section className="bg-neutral-900 py-12">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-white mb-6">
            Popular Articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* You can replace these with real-time popular posts */}
            {rest.slice(0, 4).map((post) => (
              <BlogCard key={`popular-${post.slug}`} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-black to-neutral-800 text-white text-center">
        <div className="container mx-auto max-w-2xl">
          <h3 className="text-2xl font-bold mb-4">Join Our Newsletter</h3>
          <p className="text-neutral-300 mb-6">
            Get the latest updates and curated articles delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full sm:w-2/3 rounded bg-neutral-100 text-black"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <main className="min-h-screen bg-gradient-to-b from-[#131310] to-black py-16">
        <PromptGrid prompts={prompts} />
      </main>
    </>
  );
}

function BlogCard({ slug, image, title, des }) {
  return (
    <Link
      href={`/blogopen/${slug}`}
      className="rounded-sm overflow-hidden shadow hover:shadow-md transition-transform hover:-translate-y-1"
    >
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold line-clamp-2 mb-1 hover:underline decoration-yellow-400">
          {title}
        </h3>
        <p className="text-sm text-neutral-400 line-clamp-2">{des}</p>
      </div>
    </Link>
  );
}



// function FeaturedCard({ slug, image, title, des, isVideo }) {
//   return (
//     <Link
//       href={`/blogopen/${slug}`}
//       className="group relative flex flex-col justify-end h-[500px] rounded-2xl overflow-hidden border border-neutral-800 hover:border-yellow-400 transition-all duration-500 shadow-xl hover:shadow-yellow-400/20"
//     >
//       {/* Background Image - Covers the entire card */}
//       <Image
//         src={image}
//         alt={title}
//         fill
//         className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-100" // Image scales and brightens on hover
//         sizes="100vw"
//       />

//       {/* Video Indicator - Always visible if a video */}
//       {isVideo && (
//         <div className="absolute top-8 right-8 z-20 bg-yellow-400 text-black text-2xl font-bold rounded-full p-4 shadow-lg">
//           ▶
//         </div>
//       )}

//       {/* Content Overlay - Initially subtle, reveals on hover */}
//       <div className="relative z-10 p-8 pt-24 bg-gradient-to-t from-black via-black/70 to-transparent opacity-100 group-hover:from-black/90 group-hover:via-black/95 group-hover:to-black/30 transition-all duration-500">
//         <h3 className="text-4xl font-extrabold text-white leading-tight mb-2">
//           {title}
//         </h3>
//         <p className="text-neutral-300 text-base leading-relaxed line-clamp-3 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 transition-all duration-500 overflow-hidden">
//           {des}
//         </p>
//         <span className="mt-4 text-yellow-400 font-semibold opacity-0 group-hover:opacity-100 group-hover:underline inline-block transition-all duration-500">
//           Read More →
//         </span>
//       </div>
//     </Link>
//   );
// }



