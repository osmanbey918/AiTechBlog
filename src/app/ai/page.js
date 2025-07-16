import JsonLdBlogList from "@/components/JsonLdBlogList";
import Search from "@/components/search";
import { getAllPostSlugs, getLatestPostsAi, getPostBySlug } from "@/lib/markdown";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { getAllAiPrompts } from '@/lib/markdown';
import PromptGrid from '@/components/ai/PromptGrid';
import BlogPostCard, { BlogPostCardVergeStyle } from "@/components/home/blogPost/BlogPostCard";
import MostRead from "@/components/mostread/MostRead";
import NewsLetter from "@/components/NewsLetter";
import { FeaturedCard, FeaturedCardan } from "@/components/ai/FeaturedCard";

export default async function Page() {
  const posts = await getLatestPostsAi();
  const featuredPost = posts[0].meta;

  const mainPosts = posts.slice(1, 11).map(post => ({
    ...post,
    authorName: post.author, // For BlogPostCard
  }));

  const gridPosts = posts.slice(11, 14).map(post => ({
    ...post,
    excerpt: post.description, // For FeaturedCardan
    datePublished: post.date,
    authorImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`
  }));

  // const prompts = await getAllAiPrompts();

  return (
    <>
      {/* <JsonLdBlogList posts={posts} /> */}

      {/* Hero Section */}
      <section className="w-full text-white py-20 text-center">
        <div className="g-px max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore the World of AI & Tech
          </h1>
          <p className="text-lg text-neutral-300 mb-6">
            Stay ahead with in-depth blogs, tutorials, and industry updates.
          </p>
          {/* <Suspense
            fallback={
              <div className="w-full max-w-[60%] mx-auto h-[42px] bg-black/50 animate-pulse rounded-md border border-gray-200"></div>
            }
          >
            <Search />
          </Suspense> */}
        </div>
      </section>

      {/* Featured Blog */}
      {featuredPost && (
        <section className="py-12 g-px max-w-5xl ">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-4">
            Featured
            <span className="flex-1 h-px bg-gray-200"></span>
          </h2>
          <FeaturedCard title={featuredPost.title} slug={featuredPost.slug} image={featuredPost.imageUrl} description={featuredPost.description} author={featuredPost.author} date={featuredPost.createdAt} />
        </section>
      )}

      {/* Main Content Grid */}
      <section className="w-full g-px py-12 border-t border-neutral-800">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-4">
          Latest
          <span className="flex-1 h-px bg-gray-200"></span>
        </h2>

        <div className="grid lg:grid-cols-10 lg:grid-rows-10 gap-12 flex flex-col-reverse lg:grid w-full h-full">
          {/* Left Column - BlogPostCards */}
          <div className="w-full flex flex-col gap-4 lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:row-end-11">
            {mainPosts.map((post) => (
              <div key={post.meta.slug}>
                <BlogPostCard key={`latest-${post.meta.slug}`} title={post.meta.title} slug={post.meta.slug} image={post.meta.imageUrl} description={post.meta.description} category={post.meta.category} author={post.meta.author} date={post.createdAt} />
              </div>
            ))}
          </div>

          {/* Right Column - Grid Posts */}
          <div className="w-full flex gap-20 flex-col max-lg:grid max-lg:gap-4 max-md:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 lg:col-start-7 lg:col-end-11 lg:row-start-1 lg:row-end-11">
            {gridPosts.map((post) => (
              <div key={post.meta.slug} className="min-h-96 gap-8">
                <FeaturedCardan key={`latest-${post.meta.slug}`} title={post.meta.title} slug={post.meta.slug} image={post.meta.imageUrl} description={post.meta.description} author={post.meta.author} date={post.createdAt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 g-px">
        {gridPosts.slice(0, 2).map((post) => (
          <div key={post.meta.slug} className="min-h-96 col-span-1">
            <FeaturedCardan key={`latest-${post.meta.slug}`} title={post.meta.title} slug={post.meta.slug} image={post.meta.imageUrl} description={post.meta.description} author={post.meta.author} date={post.createdAt} />

          </div>
        ))}
      </div>

      {/* Verge Style Cards */}
      <div className="g-px mt-20 flex flex-col max-w-[200px] gap-4">
        {mainPosts.slice(0, 4).map((post) => (
          <div key={post.meta.slug}>
            <BlogPostCardVergeStyle key={`latest-${post.meta.slug}`} title={post.meta.title} slug={post.meta.slug} image={post.meta.imageUrl} description={post.meta.description} author={post.meta.author} date={post.createdAt} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {/* <div className="w-full flex justify-center items-center gap-4 py-8 text-white">
        {page > 1 && (
          <Link
            href={{ query: { page: page - 1 } }}
            className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition"
          >
            Previous
          </Link>
        )}
        <div className="flex items-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <Link
              key={i + 1}
              href={{ query: { page: i + 1 } }}
              className={`w-10 h-10 flex items-center justify-center rounded ${page === i + 1
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-800 hover:bg-gray-700'
                }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
        {page < totalPages && (
          <Link
            href={{ query: { page: page + 1 } }}
            className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition"
          >
            Next
          </Link>
        )}
      </div> */}

      {/* Most Read Section */}
      <MostRead />
      {/* Prompts Grid */}
      <main className="min-h-screen py-16">
        {/* <PromptGrid prompts={prompts} /> */}
      </main>

      {/* Newsletter */}
      <NewsLetter />
    </>
  );
}







