import Image from 'next/image';
import NewsCard, { NewsSecondCard } from './NewsCard';
import NewsHead from './NewsHead';
import Articlesss from '@/app/chek/page';

const NewsSection = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/news`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  const articles = data.articles
  console.log(articles);
  // const carouselArticles = articles.slice(0, 12);
  // const gridArticles = articles.slice(18);


  return (
    <>
      {/* <NewsHead /> */}
      <h2 className="flex mt-20 w-full border-b font-bold text-6xl max-sm:text-4xl border-neutral-800 g-px">
        Trending
        <Image src="/assets/trending-up-fill.svg" width={80} height={80} alt="arrow" className='max-sm:w-[50px] max-sm:h-[50px]' />
      </h2>

      <section className="w-full container mx-auto py-8 border-t border-neutral-800 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr max-lg:px-8 max-md:px-0">
          {articles.map((article, index) => {
            if (index === 0) {
              return <NewsSecondCard key={article.id || index} {...article} />;
            }
            if (index === 2) {
              return <Articlesss key="popular-articles" />;
            }
            return <NewsCard key={article.id || index} {...article} />;
          })}
        </div>
      </section>
    </>
  );
};

export default NewsSection;
