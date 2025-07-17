import { getTodayFirstFive } from '@/lib/markdown';
import Image from 'next/image';
import Link from 'next/link';
import { BlogCardVergeStyle, BlogPostCardVergeStyle } from '../ai/FeaturedCard';

async function PopularArticles() {
  const popularPostToday = await getTodayFirstFive({ next: { revalidate: 86000 } });
  console.log(popularPostToday);
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  return (
    <div className="sticky top-6 space-y-6">
      <div className="backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-xl md:text-2xl font-semibold mb-6 relative pb-3 text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[3px] after:bg-gradient-to-r after:from-yellow-500 after:to-yellow-500">
          Popular Today
        </h3>
        <div className="flex flex-col gap-5">
          {popularPostToday &&
            popularPostToday.map((article, index) => (
              <BlogCardVergeStyle key={article.slug} title={article.title} imageUrl={article.imageUrl} time={formatDate(article.publishedAt)} author={article.author} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default PopularArticles;

//  <article key={article._id} className={`flex gap-4 group ${index !== popularPostToday.length - 1   ? 'pb-5 border-b border-gray-800'   : ''   }`}>
//                 <div className="relative w-20 h-[4.5rem] flex-shrink-0 overflow-hidden rounded-lg group-hover:ring-2 group-hover:ring-yellow-500/50 transition-all">
//                   <Image
//                     src={article.imageUrl || '/assets/default-img.png'}
//                     alt={article.title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h4 className="text-[0.95rem] md:text-base mb-1.5 leading-snug text-gray-200 group-hover:text-yellow-400 transition-colors line-clamp-2">
//                     <Link href={`/blogopen/${article.slug}`} className="hover:underline underline-offset-2">
//                       {article.title}
//                     </Link>
//                   </h4>
//                   <div className="text-xs text-gray-400 flex items-center gap-2">
//                     <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
//                     <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
//                     <span>{article.views || '—'} views</span>
//                   </div>
//                 </div>
//               </article>
//             ))
//           ) : (
//             <p className="text-gray-400 text-sm">No articles published today.</p>



















{/* Additional sidebar widget - example newsletter signup */ }
{/* <div className=" border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3 text-white">Stay Updated</h3>
        <p className="text-sm text-gray-300 mb-4">Get the latest articles delivered to your inbox</p>
        <form className="space-y-3">
          <input 
            type="email" 
            placeholder="Your email" 
            className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-medium py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            Subscribe
          </button>
        </form>
      </div> */}