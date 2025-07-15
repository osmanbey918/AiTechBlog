'use server';

import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { revalidatePath } from 'next/cache';

export async function createPost(formData) {
    const { mdxContent, jsonLd, meta } = formData;

    if (!mdxContent || !jsonLd || !meta) {
        return {
            success: false,
            error: 'Missing required fields.',
        };
    }

    try {
        await connectDB();

        const newPost = new Blog({
            mdxContent,
            jsonLd,
            meta,
        });

        await newPost.save();
        console.log(JSON.parse(JSON.stringify(newPost)));

        // After successfully saving, you might want to revalidate a path
        // to reflect the new data immediately on your site.
        revalidatePath('/blog'); // Example path

        return {
            success: true,
            message: 'Post created successfully!',
            data: JSON.parse(JSON.stringify(newPost)),
        };
    } catch (error) {
        console.error('Error creating post:', error);
        return {
            success: false,
            // Provide a more specific error message in a real application
            error: 'Failed to create post. Please try again.',
        };
    }
}