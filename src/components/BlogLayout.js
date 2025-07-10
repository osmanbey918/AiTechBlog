import Image from 'next/image';
import Link from 'next/link';
import PopularArticles from './blog/PopularArticles';

export default function BlogLayout({ meta, contentHtml }) {
  return (
    <main className="min-h-screen bg-black text-gray-100 px-4 sm:px-6 py-8 sm:py-12">
      <article className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Blog Content */}
        <section className="w-full lg:w-2/3">
          <header className="mb-10">
            {/* {meta.category && (
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-emerald-600 to-cyan-500 text-white rounded-full mb-4 hover:opacity-90 transition-opacity">
                {meta.category}
              </span>
            )} */}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5 md:mb-6 tracking-tight">
              {meta.title}
            </h1>

            <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 mb-8">
              {/* {meta.avatar && (
                <div className="flex items-center gap-2 group">
                  <div className="relative w-8 h-8">
                    <Image
                      src={meta.avatar}
                      alt={meta.author || 'Author avatar'}
                      fill
                      className="rounded-full object-cover group-hover:ring-2 group-hover:ring-cyan-500 transition-all"
                    />
                  </div>
                  <span className="font-medium text-gray-300 hover:text-cyan-400 transition-colors">
                    {meta.author}
                  </span>
                </div>
              )} */}

              {meta.date && (
                <time 
                  dateTime={meta.date} 
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                >
                  <span className="text-gray-500">📅</span> 
                  <span>{meta.date}</span>
                </time>
              )}
              {/* {meta.readTime && (
                <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                  <span className="text-gray-500">⏱</span>
                  <span>{meta.readTime}</span>
                </span>
              )}
              {meta.views && (
                <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                  <span className="text-gray-500">👁</span>
                  <span>{meta.views}</span>
                </span>
              )} */}
            </div>

            {meta.coverImage && (
              <div className="rounded-xl overflow-hidden mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={meta.coverImage}
                  alt={meta.title}
                  width={1280}
                  height={720}
                  className="w-full h-64 sm:h-80 md:h-[28rem] object-cover hover:scale-[1.01] transition-transform duration-500"
                  priority
                />
              </div>
            )}
          </header>

          <section
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-lg prose-blockquote:border-l-cyan-500
              prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-xl
              prose-ul:marker:text-cyan-400 prose-ol:marker:text-cyan-400"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </section>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/3 mt-8 lg:mt-0">
          <PopularArticles />
        </aside>
      </article>
    </main>
  );
}



