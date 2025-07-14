'use client';

import { useState } from 'react';

const CATEGORIES = [
  { id: 'all', label: 'All Prompts', color: 'yellow' },
  { id: 'development', label: 'Development', color: 'purple' },
  { id: 'design', label: 'Design', color: 'blue' },
  { id: 'content', label: 'Content', color: 'green' },
  { id: 'ai', label: 'AI & ML', color: 'red' }
];

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState('all');

  const getCategoryStyle = (categoryId) => {
    if (categoryId === activeCategory) {
      return 'bg-yellow-400 text-black hover:bg-yellow-300';
    }
    return 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 border border-neutral-800';
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    
    // Client-side filtering
    const grid = document.getElementById('promptGrid');
    const noResults = document.getElementById('noResults');
    const items = grid.children;
    let visibleCount = 0;

    for (let item of items) {
      if (categoryId === 'all' || item.dataset.category === categoryId) {
        item.style.display = '';
        item.style.animationDelay = `${visibleCount * 0.1}s`;
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    }

    // Toggle no results message
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  };

  return (
    <div className="flex flex-wrap gap-3 mb-12 justify-center">
      {CATEGORIES.map(category => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${getCategoryStyle(category.id)}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
