import Image from 'next/image';
import Link from 'next/link';

const popularArticles = [
	{
		id: 1,
		title: 'How AI is Transforming Healthcare Diagnostics',
		image: '/assets/home-ss.png',
		date: 'May 10, 2023',
		views: '12K'
	},
	{
		id: 2,
		title: 'The Complete Guide to Neural Networks in 2023',
		image: 'https://source.unsplash.com/random/200x150/?ai2',
		date: 'April 28, 2023',
		views: '9.5K'
	},
	{
		id: 3,
		title: '5 Practical Applications of Computer Vision',
		image: 'https://source.unsplash.com/random/200x150/?ai3',
		date: 'June 5, 2023',
		views: '8.7K'
	},
	{
		id: 4,
		title: 'Understanding Large Language Models',
		image: 'https://source.unsplash.com/random/200x150/?ai4',
		date: 'May 22, 2023',
		views: '7.2K'
	},
	{
		id: 5,
		title: 'The Future of AI-Powered Search Engines',
		image: 'https://source.unsplash.com/random/200x150/?ai5',
		date: 'June 12, 2023',
		views: '6.8K'
	}
];

function PopularArticles() {
  return (
    <div className="sticky top-6 space-y-6 mt-32">
      <div className="bg-black backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-xl md:text-2xl font-semibold mb-6 relative pb-3 text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[3px] after:bg-gradient-to-r after:from-cyan-500 after:to-emerald-600">
          Popular Articles
        </h3>
        <div className="flex flex-col gap-5">
          {popularArticles.map((article, index) => (
            <article
              key={article.id}
              className={`flex gap-4 group ${
                index !== popularArticles.length - 1
                  ? 'pb-5 border-b border-gray-800'
                  : ''
              }`}
            >
              <div className="relative w-20 h-[4.5rem] flex-shrink-0 overflow-hidden rounded-lg group-hover:ring-2 group-hover:ring-cyan-500/50 transition-all">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[0.95rem] md:text-base mb-1.5 leading-snug text-gray-200 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  <Link href="#" className="hover:underline underline-offset-2">
                    {article.title}
                  </Link>
                </h4>
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  <span>{article.views} views</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Additional sidebar widget - example newsletter signup */}
      <div className=" border border-gray-800 rounded-xl p-6">
      {/* <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 border border-gray-800 rounded-xl p-6"> */}
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
      </div>
    </div>
  );
}

export default PopularArticles;
