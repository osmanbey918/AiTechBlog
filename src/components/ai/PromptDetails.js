'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function PromptDetails({ prompt }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/ai"
          className="inline-flex items-center text-neutral-400 hover:text-yellow-400 mb-6 transition-colors group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Prompts
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {prompt.coverImage && (
              <div className="relative w-16 h-16 mr-4">
                <Image
                  src={prompt.coverImage}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{prompt.title}</h1>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 text-sm rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">{prompt.category}</span>
                <div className="flex items-center text-yellow-400">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{prompt.rating}</span>
                </div>
                <span className="text-neutral-400">
                  {new Intl.NumberFormat('en-US', {
                    notation: 'compact',
                    maximumSignificantDigits: 3,
                  }).format(prompt.uses)} uses
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {prompt.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm rounded-full bg-neutral-900/50 text-neutral-400 border border-neutral-800 hover:border-yellow-400/20 hover:text-yellow-400 transition-colors cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="bg-neutral-900/50 rounded-xl p-6 mb-8 border border-neutral-800">
        <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
        <p className="text-neutral-400 leading-relaxed">{prompt.excerpt}</p>
      </div>

      {/* Prompt Content */}
      <div className="bg-neutral-900/50 rounded-xl p-6 mb-8 border border-neutral-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Prompt Template</h2>
          <button
            onClick={() => copyToClipboard(prompt.content)}
            className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
              copied 
                ? 'bg-green-400/10 text-green-400 border border-green-400/20' 
                : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 hover:bg-yellow-400/20'
            }`}
          >
            {copied ? (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Prompt
              </>
            )}
          </button>
        </div>
        <div className="bg-neutral-950/50 rounded-lg p-6 font-mono text-sm text-neutral-300 whitespace-pre-wrap border border-neutral-800">
          {prompt.content}
        </div>
      </div>

      {/* Usage Guide and Results */}
      <div className="space-y-8">
        {Array.isArray(prompt.usageTips) && prompt.usageTips.length > 0 && (
          <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-white">Usage Tips</h2>
            </div>
            <ul className="list-none space-y-3">
              {prompt.usageTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400/10 text-yellow-400 text-sm mr-3 flex-shrink-0 mt-0.5 border border-yellow-400/20">
                    {index + 1}
                  </span>
                  <span className="text-neutral-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {prompt.expectedResults && Object.keys(prompt.expectedResults).length > 0 && (
          <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <h2 className="text-xl font-semibold text-white">Expected Results</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(prompt.expectedResults).map(([key, value], index) => (
                <div key={index} className="bg-neutral-950/50 rounded-lg p-4 flex items-start border border-neutral-800">
                  <div className="flex-1">
                    <div className="text-yellow-400 font-medium mb-1">{key}</div>
                    <div className="text-neutral-300">{value}</div>
                  </div>
                  <svg
                    className="w-5 h-5 text-yellow-400 flex-shrink-0 ml-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
