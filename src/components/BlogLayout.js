export default function BlogLayout({ meta, contentHtml }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 dark:bg-[#0f172a] dark:text-slate-100 py-10 px-4 transition-colors">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Article Header */}
          <div className="mb-8">
            <span className="inline-block px-4 py-1 text-xs font-semibold bg-green-500 text-white rounded-full mb-2">
              {meta.category}
            </span>

            <h1 className="text-4xl font-bold leading-tight mb-4">
              {meta.title}
            </h1>

            <div className="flex flex-wrap items-center text-sm text-slate-600 dark:text-slate-300 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <img
                  src={meta.avatar}
                  alt={meta.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium">{meta.author}</span>
              </div>
              <span>📅 {meta.date}</span>
              <span>⏱ {meta.readTime}</span>
              <span>👁 {meta.views}</span>
            </div>

            <img
              src={meta.coverImage}
              alt={meta.title}
              className="w-full h-64 object-cover rounded-lg shadow mb-6"
            />
          </div>

          {/* Article Body */}
          <div
            className="prose prose-lg max-w-none prose-slate dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Footer Tags */}
          <div className="mt-10 border-t border-slate-300 dark:border-slate-600 pt-6 flex flex-wrap gap-2">
            {meta.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 dark:bg-blue-900 dark:text-blue-300 text-blue-700 px-3 py-1 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* (Optional) Sidebar could go here */}
      </div>
    </div>
  );
}
