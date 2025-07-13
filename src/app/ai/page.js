import FeaturedCard, { BlogCard, BlogCardInvert, FeaturedCardInvert } from "@/components/ai/FeaturedCard";
import JsonLdBlogList from "@/components/JsonLdBlogList";
import Search from "@/components/search";
import { getAllPostSlugs, getPostBySlug } from "@/lib/markdown";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { getAllAiPrompts } from '@/lib/markdown';
import PromptGrid from '@/components/ai/PromptGrid';
import BlogPostCard from "@/components/home/blogPost/BlogPostCard";

export default async function Page() {
  const slugs = getAllPostSlugs();

  const posts = await Promise.all(
    slugs.slice(0, 20).map(async (slug) => {
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

  const featured = posts[0]; // First article as featured
  const blogPosts = posts.slice(1, 9); // Next 10 articles for BlogPost
  const blogCards = posts.slice(9, 13); // Next 4 articles for BlogCard
  const blogInvertCards = posts.slice(13, 17); // Next 4 articles for BlogCardInvert
  const featuredInvert = posts[18]; // Last article as featuredInvert

  const prompts = await getAllAiPrompts();

  return (
    <>
      <JsonLdBlogList posts={posts} />

      {/* Hero Section */}
      <section className="w-full text-white py-20 text-center">
        <div className="g-px max-w-4xl">
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
        <section className="py-12 g-px max-w-5xl ">
          <h2 className="text-2xl font-bold text-white mb-6 underline decoration-yellow-500">Featured Blog</h2>
          <FeaturedCard {...featured} />
        </section>
      )}

      {/* Blog Listing */}
      <section className="w-full g-px py-12 border-t border-neutral-800">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-4">
          Latest
          <span className="flex-1 h-px bg-gray-200"></span>
        </h2>

        <div className="grid lg:grid-cols-10 lg:grid-rows-10 gap-4 flex flex-col-reverse lg:grid w-full h-full">
          <div className="w-full max-lg:grid max-lg:gap-4 max-md:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 lg:col-start-7 lg:col-end-11 lg:row-start-1 lg:row-end-11">
            {blogCards.map((post) => (
              <div key={post.slug} className="min-h-96">
                <BlogCard {...post} />
              </div>
            ))}
          </div>
          <div className="w-full lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:row-end-11">
            {blogPosts.map((post) => (
              <div key={post.slug}>
                <BlogPostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredInvert && (
        <section className="py-12 bg-yellow-400 w-full">
          <div className="g-px ">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-4">
                  Most Read
                  <span className="flex-1 h-px bg-gray-950/30"></span>
                </h2>
            <FeaturedCardInvert {...featuredInvert} />
            <section className="py-12">
              <div className=" w-full">

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {blogInvertCards.map((post) => (
                    <BlogCardInvert key={`popular-${post.slug}`} {...post} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      )}

      {/* Popular Section (Placeholder) */}

      <main className="min-h-screen py-16">
        <PromptGrid prompts={prompts} />
      </main>
      {/* Newsletter CTA */}
      <section className="py-16 px-4 text-white text-center">
        <div className="g-px max-w-64">
          <h3 className="text-2xl font-bold mb-4">Join Our Newsletter</h3>
          <p className="text-neutral-300 mb-6">
            Get the latest updates and curated articles delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full max-w-md sm:w-2/3 rounded bg-neutral-100 text-black"
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
    </>
  );
}







