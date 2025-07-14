'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CategoryFilter = dynamic(() => import('./CategoryFilter'));
const PromptCard = dynamic(() => import('./PromptCard'));

export default function ClientPromptGrid({ prompts }) {
  return (
    <>
      {/* Client-side Category Filter */}
      <Suspense fallback={<div className="h-12 bg-neutral-900 animate-pulse rounded-lg"/>}>
        <CategoryFilter />
      </Suspense>

      {/* Grid Layout */}
      <div id="promptGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {prompts.map((prompt, index) => (
          <Suspense key={prompt.id || index} fallback={
            <div className="bg-neutral-900/50 rounded-xl h-48 animate-pulse"></div>
          }>
            <div 
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-category={prompt.category}
            >
              <PromptCard prompt={prompt} />
            </div>
          </Suspense>
        ))}
      </div>

      {/* No Results State */}
      <div id="noResults" className="hidden text-center py-16 bg-neutral-900/50 rounded-lg border border-neutral-800">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-yellow-400/10 mb-4">
          <svg
            className="w-8 h-8 text-yellow-400"
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
        <p className="text-neutral-400">
          No prompts found in this category. Try selecting a different category.
        </p>
      </div>
    </>
  );
}
