'use server';

import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Prompt from '@/models/Prompt';

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
        return {
            success: true,
            message: 'Post created successfully!',
            data: JSON.parse(JSON.stringify(newPost)),
        };
    } catch (error) {
        console.error('Error creating post:', error);
        return {
            success: false,
            error: 'Failed to create post. Please try again.',
        };
    }
}

export async function createPrompt(formData) {
  const { mdxContent, meta } = formData;

  if (!mdxContent || !meta) {
    return {
      success: false,
      error: 'Missing required fields.',
    };
  }

  try {
    await connectDB();

    // Attach rating and uses
    meta.rating = getRandomRating();
    meta.uses = getRandomUses();

    const newPrompt = new Prompt({
      mdxContent,
      meta,
    });

    await newPrompt.save();
    console.log(JSON.parse(JSON.stringify(newPrompt)));

    return {
      success: true,
      message: 'Prompt created successfully!',
      data: JSON.parse(JSON.stringify(newPrompt)),
    };
  } catch (error) {
    console.error('Error creating Prompt:', error);
    return {
      success: false,
      error: 'Failed to create Prompt. Please try again.',
    };
  }
}


function getRandomRating() {
  return (Math.random() * (5 - 3.6) + 3.6).toFixed(1);  // string like '4.2'
}

function getRandomUses() {
  const uses = Math.floor(Math.random() * (90000 - 20000) + 20000); // 20k-90k
  return (uses / 1000).toFixed(1) + 'k';  // e.g., '53.2k'
}
