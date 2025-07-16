import Blog from "@/models/Blog";
import connectDB from "./mongodb";


export async function getPostBySlugdb(slug) {
  try {
    await connectDB();
    const post = await Blog.findOne({ "meta.slug": slug }).lean();
    if (!post) return null;

    return {
      _id: post._id.toString(),
      mdxContent: post.mdxContent,
      meta: {
        title: post.meta.title,
        description: post.meta.description,
        slug: post.meta.slug,
        author: post.meta.author,
        keywords: post.meta.keywords,
        imageUrl: post.meta.imageUrl,
        publishedAt: post.meta.publishedAt,
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  } catch (error) {
    console.error("Failed to fetch blog by slug:", error);
    return null;
  }
}


export async function getAllPostSlugs() {
  try {
    await connectDB();
    // Only fetch slugs from meta
    const posts = await Blog.find({}, { "meta.slug": 1 }).lean();
    // Filter out missing slugs and convert to simple array
    const slugs = posts
      .map(post => post?.meta?.slug)
      .filter(Boolean);

    return slugs;
  } catch (error) {
    console.error("Failed to fetch blog slugs:", error);
    return [];
  }
}

export async function getLatestPosts() {
  try {
    await connectDB();
    // Fetch latest 20 blogs
    let articles = await Blog.find({})
      .sort({ publishedAt: -1 })
      .limit(20)
      .lean();
    console.log(articles);

    return articles;
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return [];
  }
}

export async function getLatestPostsAi() {
  try {
    await connectDB();

    let articles = await Blog.find({
      $or: [
        { 'meta.category': 'ai' }, // if category is exactly 'ai'
        { 'meta.keywords': { $regex: 'ai', $options: 'i' } }, // if keywords contains 'ai', case-insensitive
      ]
    })
      .sort({ publishedAt: -1 })
      .limit(20)
      .lean();

    console.log(articles);

    return articles;
  } catch (error) {
    console.error("Error fetching AI posts:", error);
    return [];
  }
}
