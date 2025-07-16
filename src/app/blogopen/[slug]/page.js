import { getAllPostSlugs, getPostBySlugdb } from '@/lib/markdown';
import BlogLayout from '@/components/BlogLayout';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}


export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await getPostBySlugdb(slug);
  if (!post) {
    notFound();
  }
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.techolyze.com';
  const postUrl = `${siteUrl}/blogopen/${slug}`;
  const coverImageUrl = post.meta.imageUrl || `${siteUrl}/og-image.png`;

  return {
    title: `${post.meta.title} | Techolyze`,
    description: post.meta.description,
    authors: [{ name: post.meta.author }],
    publisher: 'Techolyze',
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url: postUrl,
      siteName: 'Techolyze',
      images: [
        {
          url: coverImageUrl,
          width: 1200,
          height: 630,
          alt: post.meta.title,
        },
      ],
      type: 'article',
      locale: 'en_US',
      // 2. Add dynamic dates
      publishedTime: post.meta.publishedAt,
      modifiedTime: post.meta.modifiedDate || post.meta.publishedAt,
      authors: [post.meta.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.description,
      images: [coverImageUrl],
      creator: '@YourTwitterHandle', // Add your site's Twitter handle
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      maxSnippet: -1,
      maxImagePreview: 'large',
      maxVideoPreview: -1,
    },
    // JSON-LD Structured Data
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': post.meta.title,
        'image': coverImageUrl,
        'author': {
          '@type': 'Person',
          'name': post.meta.author,
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Techolyze',
          'logo': {
            '@type': 'ImageObject',
            'url': `${siteUrl}/logo.png`,
          },
        },
        'datePublished': post.meta.publishedAt,
        'dateModified': post.meta.modifiedDate,
        'description': post.meta.description,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': postUrl,
        },
      }),
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getPostBySlugdb(slug);
  const contentHtml = marked.parse(post.mdxContent);

  return (
    <>
      <BlogLayout meta={post.meta} contentHtml={contentHtml} />
    </>
  );
}
