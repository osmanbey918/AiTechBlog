'use client';

import PromptCard from './PromptCard';

export default function PromptGrid({ prompts }) {
  return (
    <div className="w-full max-w-7xl g-px">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          AI Prompts Collection
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover our curated collection of AI prompts designed to enhance your development,
          design, and content creation workflow.
        </p>
      </div>

      {/* Filters (can be expanded later) */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
          All Prompts
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors">
          Development
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors">
          Design
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors">
          Content
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt, index) => (
          <PromptCard key={index} prompt={prompt} />
        ))}
      </div>

      {/* No Results State */}
      {prompts.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4">
            <svg
              className="w-8 h-8 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No prompts found</h3>
          <p className="text-gray-400">
            Try adjusting your filters or check back later for new prompts.
          </p>
        </div>
      )}
    </div>
  );
}
