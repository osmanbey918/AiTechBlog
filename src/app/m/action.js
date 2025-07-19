'use server';

import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function getLatestPosts() {
    try {
        await connectDB();

        // Fetch latest 20 blogs
        let articles = await Blog.find({})
            .sort({ publishedAt: -1 })
            .limit(20)
            .lean();

        return articles;
    } catch (error) {
        console.error("Error fetching latest posts:", error);
        return [];
    }
}
export async function getPopularPosts() {
    try {
        await connectDB();

        let articles = await Blog.find({})
            .sort({ publishedAt: 1 })
            .limit(5)
            .lean();

        return articles;
    } catch (error) {
        console.error("Error fetching latest posts:", error);
        return [];
    }
}
