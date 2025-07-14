import Image from 'next/image';
import Link from 'next/link';

export default function PromptCard({ prompt }) {
  return (
    <Link href={`/ai-prompts/${prompt.slug}`} className="block group">
      <article className="relative overflow-hidden rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-yellow-400/20 transition-colors duration-300">
        {/* Top Banner */}
        <div className="flex items-center justify-between px-6 py-3 bg-neutral-900/50 border-b border-neutral-800 group-hover:border-yellow-400/20">
          <span className="text-sm font-medium text-neutral-300">
            {prompt.category}
          </span>
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-yellow-400">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">{prompt.rating}</span>
            </div>
            <span className="text-sm text-neutral-400">
              {new Intl.NumberFormat('en-US', { notation: 'compact', maximumSignificantDigits: 3 }).format(prompt.uses)} uses
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 group-hover:bg-neutral-900/30 transition-colors duration-300">
          <div className="flex items-center mb-4">
            {prompt.coverImage && (
              <div className="relative w-12 h-12 mr-4 rounded-lg overflow-hidden bg-neutral-800 ring-1 ring-neutral-700">
                <Image
                  src={prompt.coverImage}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
              {prompt.title}
            </h3>
          </div>

          <p className="text-neutral-400 mb-4 line-clamp-2">{prompt.excerpt}</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-neutral-800 bg-neutral-900/50 group-hover:border-yellow-400/20">
          <div className="flex items-center text-sm text-neutral-500">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {new Date(prompt.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <span className="text-sm text-yellow-400 group-hover:translate-x-1 transition-transform duration-300">
            View Prompt →
          </span>
        </div>
      </article>
    </Link>
  );
}
