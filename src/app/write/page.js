'use client';
import React, { useState } from 'react';
import RichTextEditor from '@/components/editor/RichTextEditor';
import Image from 'next/image';

export default function WriteBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          author: 'Current User', // Replace with actual user data
          publishedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save blog post');
      }

      setSuccess(true);
      setTitle('');
      setContent('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Write a Blog Post</h1>
          <Image src="/assets/Logo.svg" alt="Logo" width={40} height={40} />
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-2 rounded mb-4">
            Blog post saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your blog title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Content
            </label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-600 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Saving...' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
