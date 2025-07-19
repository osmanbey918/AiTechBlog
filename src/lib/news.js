import News from "@/models/News";
import connectDB from "./mongodb";

export async function getAllNews() {
  try {
    await connectDB();

    const articles = await News.find({})
      .sort({ createdAt: -1 })
      .limit(25)
      .select()
      .lean();

    return articles;
  } catch (error) {
    console.error("Error fetching today's :", error);
    return [];
  }
}

export async function getAllNewsSlugs() {
 try {
    await connectDB();
    const posts = await News.find({}, { "meta.slug": 1 }).lean();

    return posts
      .map(post => post?.meta?.slug)
      .filter(Boolean)
      .map(slug => ({ slug }));
  } catch (error) {
    console.error("Failed to fetch blog slugs:", error);
    return [];
  }
}
export async function getNewsBySlugdb(slug) {
  try {
    await connectDB();
    const post = await News.findOne({ "meta.slug": slug }).lean();
    if (!post) return null;

    return {
      _id: post._id.toString(),
      mdxContent: post.mdxContent,
      meta: {
        title: post.meta.title,
        description: post.meta.description,
        slug: post.meta.slug,
        author: post.meta.source,
        category: post.meta.category,
        imageUrl: post.meta.urlToImage,
        publishedAt: post.meta.publishedAt,
        likes:post.meta.likes,
        shares:post.meta.shares,
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  } catch (error) {
    console.error("Failed to fetch blog by slug:", error);
    return null;
  }
}