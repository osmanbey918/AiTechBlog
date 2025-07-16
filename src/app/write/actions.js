'use server';

import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function createPost(formData) {
    const { mdxContent, meta } = formData;

    if (!mdxContent || !meta) {
        return {
            success: false,
            error: 'Missing required fields.',
        };
    }

    try {
        await connectDB();
        const newPost = new Blog({
            mdxContent,
            meta,
        });
        await newPost.save();
        console.log(JSON.parse(JSON.stringify(newPost)));

        // After successfully saving, you might want to revalidate a path
        // to reflect the new data immediately on your site.
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