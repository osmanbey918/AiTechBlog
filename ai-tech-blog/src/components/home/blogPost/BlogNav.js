"use client";
import * as React from "react";

function BlogNav() {
  return <CategoryFilter />;
}

function CategoryFilter() {
  const [activeFilter, setActiveFilter] = React.useState("All");

  const filters = [
    "All",
    "Quantum Computing",
    "AI Ethics",
    "Space Exploration",
    "Biotechnology",
    "Renewable Energy",
  ];

  return (
    <nav className="flex gap-3.5 items-start g-px py-10 w-full border border-neutral-800 max-md:py-10 max-sm:flex-col max-sm:gap-2 max-sm:p-5">
      {filters.map((filter) => (
        <FilterButton
          key={filter}
          isActive={activeFilter === filter}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </FilterButton>
      ))}
    </nav>
  );
}

function FilterButton({ children, isActive, onClick }) {
  const baseClasses =
    "flex-1 gap-2.5 px-4 py-6 text-sm tracking-tight leading-5 rounded-lg border border-neutral-800 max-sm:px-3 max-sm:py-4 max-sm:w-full transition-colors";
  const activeClasses = "text-white bg-zinc-900";
  const inactiveClasses = "text-neutral-400 hover:text-neutral-300";

  return (
    <button
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default BlogNav;
