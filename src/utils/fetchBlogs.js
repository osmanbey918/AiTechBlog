import Parser from 'rss-parser';

const parser = new Parser();

export async function fetchBlogs() {
  const feed = await parser.parseURL('https://techcrunch.com/feed/');
  
  const blogs = feed.items.map(item => ({
    title: item.title,
    link: item.link,
    summary: item.contentSnippet,
    published: item.pubDate,
  }));

  return blogs;
}
