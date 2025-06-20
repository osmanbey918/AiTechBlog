import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 5000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
});

const feedUrls = [
  'https://techcrunch.com/feed/',
//   'https://www.theverge.com/rss/index.xml',
  'https://www.wired.com/feed/rss',
//   'http://feeds.arstechnica.com/arstechnica/index',
//   'https://hnrss.org/frontpage'
];

// Image extractor function
function extractImageFromContent(content) {
  const match = content?.match(/<img[^>]+src="([^">]+)"/i);
  return match ? match[1] : null;
}

export async function GET() {
  try {
    await connectDB();
    let allBlogs = [];

    // First, try to get blogs from MongoDB
    const mongoBlogs = await Blog.find({}).sort({ publishedAt: -1 });
    
    if (mongoBlogs.length > 0) {
      return NextResponse.json({ blogs: mongoBlogs }, { status: 200 });
    }

    // If no blogs in MongoDB, fetch from RSS feeds and store them
    for (const url of feedUrls) {
      try {
        const feed = await parser.parseURL(url);
        console.log(feed);
        
        const blogs = feed.items.slice(0, 3).map(item => {
          const imageFromContent = extractImageFromContent(item.content);
          return {
            title: item.title,
            link: item.link,
            summary: item.contentSnippet?.substring(0, 200) + '...',
            published: item.pubDate || item.isoDate,
            author: item.creator || item['dc:creator'] || feed.title || 'Unknown',
            categories: item.categories || [],
            image: imageFromContent || feed.image?.url || 'https://via.placeholder.com/150',
            description: item.content,
            source: feed.title,
          };
        });

        allBlogs = [...allBlogs, ...blogs];
      } catch (feedError) {
        console.error(`Failed to fetch feed: ${url}`, feedError);
      }
    }

    allBlogs.sort((a, b) => new Date(b.published) - new Date(a.published));

    return NextResponse.json(allBlogs, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch all RSS feeds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const newBlog = new Blog({
      title: body.title,
      content: body.content,
      author: body.author,
      category: body.category || 'Other',
      tags: body.tags || [],
      image: body.image || '/assets/r-blog.svg',
      status: body.status || 'published',
      publishedAt: body.publishedAt || new Date(),
    });

    const savedBlog = await newBlog.save();

    return new Response(JSON.stringify({ success: true, blog: savedBlog }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}