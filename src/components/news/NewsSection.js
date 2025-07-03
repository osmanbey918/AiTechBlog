import Image from 'next/image';
import NewsCard, { NewsSecondCard } from './NewsCard';
import NewsHead from './NewsHead';
import Articlesss from '@/app/chek/page';

const NewsSection = ({newsArticles}) => {

  const carouselArticles = newsArticles.slice(0, 12);
  const gridArticles = newsArticles.slice(18);
  console.log(carouselArticles.length);
  

  return (
    <>
      <NewsHead articles={carouselArticles} />
      <h2 className="flex mt-20 w-full border-b font-bold text-6xl border-neutral-800 g-px">
        Trending
        <Image src="/assets/trending-up-fill.svg" width={80} height={80} alt="arrow" />
      </h2>

      <section className="w-full container mx-auto py-8 border-t border-neutral-800 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr max-lg:px-8 max-md:px-0">
          {gridArticles.map((article, index) => {
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
