"use client";
import React, { useState } from "react";

const filters = [
  "All",
  "Quantum Computing",
  "AI Ethics",
  "Space Exploration",
  "Biotechnology",
  "Renewable Energy",
];

export default function BlogNav() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <nav className="flex overflow-x-auto gap-4 g-px py-8 w-full border border-neutral-800 scrollbar-hide scroll-smooth">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`flex-shrink-0 w-[200px] px-4 py-6 text-sm rounded-lg border border-neutral-800 transition-colors
            ${activeFilter === filter
              ? "bg-zinc-900 text-white"
              : "text-neutral-400 hover:text-neutral-300"}
          `}
        >
          {filter}
        </button>
      ))}
    </nav>
  );
}
