import Image from 'next/image';
import { FeaturedCard, FeaturedCardan } from '../ai/FeaturedCard';
import NewsCard, { NewsSecondCard } from './NewsCard';

const NewsSection = ({posts}) => {
  const featuredPost = posts[0].meta;
  const mainpost = posts.slice(0,8)
  return (
    <>
      {/* <NewsHead /> */}
      <section className='g-px'>

        <FeaturedCard title={featuredPost.title} type={'news'} slug={featuredPost.slug} image={featuredPost.urlToImage} description={featuredPost.description} source={featuredPost.author} date={featuredPost.createdAt}
          altText="News Image" />
      </section>
      <h2 className="flex mt-20 w-full border-b font-bold text-6xl max-sm:text-4xl border-neutral-800 g-px">
        Trending
        <Image src="/assets/trending-up-fill.svg" width={80} height={80} alt="arrow" className='max-sm:w-[50px] max-sm:h-[50px]' />
      </h2>

      <section className="w-full container g-px py-8 border-t border-neutral-800 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr max-lg:px-8 max-md:px-0">
          {mainpost.slice(1, 8).map((blog, index) => {
            if (index == 0) {
              return <NewsSecondCard key={blog.meta.slug} title={blog.meta.title} url={blog.meta.slug} image={blog.meta.urlToImage} description={blog.meta.description} author={blog.meta.author} publishedAt={blog.createdAt} />;
            }
            return <NewsCard key={blog.meta.slug} title={blog.meta.title} description={blog.meta.description} publishedAt={blog.createdAt} category={blog.meta.category} author={blog.meta.source} image={blog.meta.urlToImage} url={blog.meta.slug} />;
          })}
        </div>
      </section>
    </>
  );
};

export default NewsSection;
