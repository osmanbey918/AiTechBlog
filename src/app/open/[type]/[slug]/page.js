import { getAllPostSlugs, getPostBySlugdb } from '@/lib/markdown';
import BlogLayout from '@/components/BlogLayout';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getAllNewsSlugs, getNewsBySlugdb } from '@/lib/news';

export async function generateStaticParams() {
  const blogSlugs = await getAllPostSlugs();
  const newsSlugs = await getAllNewsSlugs();

  return [
    ...blogSlugs.map(({ slug }) => ({ type: 'blog', slug })),
    ...newsSlugs.map(({ slug }) => ({ type: 'news', slug })),
  ];
}

export async function generateMetadata({ params }) {
  const { type, slug } = params;
  const data =
    type === 'blog' ? await getPostBySlugdb(slug) : await getNewsBySlugdb(slug);

  if (!data) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.techolyze.com';
  const postUrl = `${siteUrl}/open/${type}/${slug}`;
  const coverImageUrl = data.meta.imageUrl || `${siteUrl}/og-image.png`;

  return {
    title: `${data.meta.title} | Techolyze`,
    description: data.meta.description,
    authors: [{ name: data.meta.author }],
    publisher: 'Techolyze',
    alternates: { canonical: postUrl },
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      url: postUrl,
      siteName: 'Techolyze',
      images: [{ url: coverImageUrl, width: 1200, height: 630, alt: data.meta.title }],
      type: 'article',
      locale: 'en_US',
      publishedTime: data.meta.publishedAt,
      modifiedTime: data.meta.modifiedDate || data.meta.publishedAt,
      authors: [data.meta.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.meta.title,
      description: data.meta.description,
      images: [coverImageUrl],
      creator: '@YourTwitterHandle',
    },
    robots: {
      index: true, follow: true, nocache: false,
      maxSnippet: -1, maxImagePreview: 'large', maxVideoPreview: -1,
    },
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.meta.title,
        image: coverImageUrl,
        author: { '@type': 'Person', name: data.meta.author },
        publisher: {
          '@type': 'Organization',
          name: 'Techolyze',
          logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
        },
        datePublished: data.meta.publishedAt,
        dateModified: data.meta.modifiedDate,
        description: data.meta.description,
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
      }),
    },
  };
}

export default async function Page({ params }) {
  const { type, slug } = params;
  const data =
    type === 'blog' ? await getPostBySlugdb(slug) : await getNewsBySlugdb(slug);

  if (!data) notFound();

  const contentHtml = marked.parse(data.mdxContent);

  return (
    <>
      <BlogLayout meta={data.meta} contentHtml={contentHtml} />
    </>
  );
}
