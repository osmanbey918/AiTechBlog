import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';
import BlogLayout from '@/components/BlogLayout';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  console.log(slugs);
  
  // Support both array of strings and array of objects
  return slugs.map(slugObj => (
    typeof slugObj === 'string'
      ? { slug: slugObj }
      : { slug: slugObj.slug || slugObj.params?.slug }
  ));
}


// ✅ SEO metadata for each blog page
export async function generateMetadata({ params }) {
  const {slug} = await params;
  const post = await getPostBySlug(slug);


  return {
    title: `${post.meta.title} | AI Tech Blog`,
    description: post.meta.excerpt || 'Read this article on AI Tech Blog',
    keywords: post.meta.tags || [],
    authors: [{ name: post.meta.author }],
    publisher: 'AI Tech Blog',
    alternates: {
      canonical: `https://yourdomain.com/blogopen/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt || '',
      url: `https://yourdomain.com/blogopen/${slug}`,
      siteName: 'AI Tech Blog',
      images: [
        {
          url: post.meta.coverImage,
          width: 1200,
          height: 630,
          alt: post.meta.title,
        },
      ],
      type: 'article',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.excerpt || '',
      images: [post.meta.coverImage],
    },
  };
}



export default async function BlogPage({ params }) {
    const {slug} = await params
    const post = await getPostBySlug(slug);
    console.log(post.contentHtml);

    return <BlogLayout meta={post.meta} contentHtml={post.contentHtml} />;
}
