import Image from 'next/image';
import Articlesss from '../Articlesss';
import { FeaturedCard } from '../ai/FeaturedCard';
import NewsCard, { NewsSecondCard } from './NewsCard';

const NewsSection = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/news`, {
    next: { revalidate: 2500 },
  });
  const data = await res.json();
  const articles = data.articles
  // const carouselArticles = articles.slice(0, 12);
  // const gridArticles = articles.slice(18);
  const featured = articles[7]

  return (
    <>
      {/* <NewsHead /> */}
      <section className='g-px'>

      <FeaturedCard title={featured.title}
        category={featured.category}
        description={featured.description}
        datePublished={featured.publishedAt}
        slug={featured.url}
        image={featured.image}
        author={featured.source.name}
        altText="News Image" />
      </section>
      <h2 className="flex mt-20 w-full border-b font-bold text-6xl max-sm:text-4xl border-neutral-800 g-px">
        Trending
        <Image src="/assets/trending-up-fill.svg" width={80} height={80} alt="arrow" className='max-sm:w-[50px] max-sm:h-[50px]' />
      </h2>

      <section className="w-full container mx-auto py-8 border-t border-neutral-800 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr max-lg:px-8 max-md:px-0">
          {articles.slice(0, 7).map((article, index) => {
            if (index === 0) {
              return <NewsSecondCard key={article.id || index} {...article} />;
            }
            // if (index === 2) {
            //   return <Articlesss key="popular-articles" />;
            // }
            return <NewsCard key={article.id || index} {...article} />;
          })}
        </div>
      </section>
    </>
  );
};

export default NewsSection;
