import Image from 'next/image';
import NewsCard, { NewsSecondCard } from './NewsCard';
import NewsHead from './NewsHead';
import Articlesss from '@/app/chek/page';
import { getNews } from '@/utils/getNews';

const NewsSection = async () => {
  let newsArticles = [];

  try {
    const { articles } = await getNews();

    if (!articles || articles.length === 0) {
      //  return fallback UI if no articles found
      return (
        <div className="text-center text-gray-500 py-12">
          No news articles available at the moment.
        </div>
      );
    }

    newsArticles = articles;
  } catch (error) {
    console.error('NewsSection SSR error:', error);

    return (
      <div className="text-center text-red-500 py-12">
        Something went wrong while loading the news.
      </div>
    );
  }

  const carouselArticles = newsArticles.slice(0, 4);
  const gridArticles = newsArticles.slice(1);

  return (
    <>
      <NewsHead articles={carouselArticles} />
      <h2 className="flex mt-20 w-full border-b font-bold text-6xl border-neutral-800 g-px">
        Trending
        <Image src="/assets/trending-up-fill.svg" width={80} height={80} alt="arrow" />
      </h2>

      <section className="w-full container mx-auto g-px py-8 border-t border-neutral-800 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
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
