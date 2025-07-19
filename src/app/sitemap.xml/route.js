import { getAllPostSlugs } from "@/lib/markdown";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techolyze.com';
  const posts = await getAllPostSlugs(); // should return [{ slug: 'slug-1' }, ...]

  const urls = posts.map(({ slug }) => `
    <url>
      <loc>${siteUrl}/open/blog/${slug}</loc>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${siteUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${urls}
    </urlset>
  `;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
