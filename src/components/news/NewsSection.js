
import Image from 'next/image';
import NewsCard, { NewsSecondCard } from './NewsCard';
import NewsHead from './NewsHead';
import { Articlesss } from '@/app/chek/page';
import { getNews } from '@/utils/getNews';

const NewsSection = () => {
const newsArticles =  getNews()
console.log(newsArticles);

  // if (loading) {
  //   return (
  //     <section className="w-full g-px py-8 border-t border-neutral-800 sm:py-12 md:py-16">
  //       <div className="flex justify-center items-center min-h-[400px]">
  //         <div className="text-neutral-400">Loading latest news...</div>
  //       </div>
  //     </section>
  //   );
  // }

  // if (error && !newsArticles.length) {
  //   return (
  //     <section className="w-full g-px py-8 border-t border-neutral-800 sm:py-12 md:py-16">
  //       <div className="flex justify-center items-center min-h-[400px]">
  //         <div className="text-red-400">{error}</div>
  //       </div>
  //     </section>
  //   );
  // }

  // const carouselArticles = newsArticles.slice(0, 4);
  // const gridArticles = newsArticles.slice(1);

  return (
    <>
      <NewsHead articles={carouselArticles} />
      <h2 className="flex mt-20 w-full border-b font-bold text-6xl border-neutral-800 g-px">
        Trending
        <Image src="/assets/trending-up-fill.svg" width={80} height={80} alt="arrow" />
      </h2>
      <section className="w-full contaier mx-auto g-px py-8 border-t border-neutral-800 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
          {gridArticles.map((article, index) => {
            if (index === 0) {
              return <NewsSecondCard key={index} {...article} />;
            }
            if (index == 2) {
              return <Articlesss />
            }
            return <NewsCard key={index} {...article} />;
          })}

        </div>

        {/* {error && newsArticles.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )} */}
      </section>
    </>
  );
};

export default NewsSection;
