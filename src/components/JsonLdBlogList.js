'use client';
import Script from 'next/script';

export default function JsonLdBlogList({ posts }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "AI Tech Blog",
    "url": "https://yourdomain.com/open",
    "description": "Explore the latest AI tools and trends through in-depth blogs.",
    "blogPost": posts.map(post => ({
      "@type": "Articles",
      "headline": post.title,
      "image": post.image,
      "url": `https://yourdomain.com/open/blog/${post.slug}`,
      "description": post.des,
      "author": {
        "@type": "Person",
        "name": "Muhammad Usman"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AI Tech Blog",
        "logo": {
          "@type": "ImageObject",
          "url": "https://yourdomain.com/logo.png"
        }
      }
    }))
  };

  return (
    <Script
      id="jsonld-bloglist"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
