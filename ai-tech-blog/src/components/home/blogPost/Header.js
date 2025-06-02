"use client";
import * as React from "react";

function BlogSectionHeader() {
  return (
    <section className="flex gap-52 items-center p-20 w-full border bg-zinc-900 border-neutral-800 max-md:gap-24 max-md:p-16 max-sm:flex-col max-sm:gap-10 max-sm:p-10">
      <div className="flex flex-col flex-1 gap-2.5 justify-center items-start max-sm:w-full">
        <Badge>A Knowledge Treasure Trove</Badge>
        <h1 className="w-full text-5xl tracking-tighter text-white leading-[57.2px] max-md:text-4xl max-md:tracking-tighter max-sm:text-3xl max-sm:tracking-tighter">
          Explore FutureTech's In-Depth Blog Posts
        </h1>
      </div>
      <ViewAllButton />
    </section>
  );
}

function ViewAllButton() {
  return (
    <button className="flex gap-1 items-center px-5 py-3.5 rounded-lg border bg-neutral-900 border-neutral-800 max-sm:justify-center max-sm:w-full">
      <span className="text-sm tracking-tight leading-5 text-neutral-400">
        View All Blogs
      </span>
      <ArrowIcon />
    </button>
  );
}

function Badge({ children }) {
  return (
    <div className="gap-2.5 px-2 py-1 text-base tracking-tight leading-6 text-white rounded bg-zinc-800 max-sm:text-sm max-sm:tracking-tight">
      {children}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[20px] h-[20px]"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.875 3.625L16.25 3.625C16.4158 3.625 16.5747 3.69085 16.6919 3.80806C16.8092 3.92527 16.875 4.08424 16.875 4.25V13.625C16.875 13.9702 16.5952 14.25 16.25 14.25C15.9048 14.25 15.625 13.9702 15.625 13.625V5.75888L4.19194 17.1919C3.94786 17.436 3.55214 17.436 3.30806 17.1919C3.06398 16.9479 3.06398 16.5521 3.30806 16.3081L14.7411 4.875L6.875 4.875C6.52982 4.875 6.25 4.59518 6.25 4.25C6.25 3.90482 6.52982 3.625 6.875 3.625Z"
        fill="#FFD11A"
      />
    </svg>
  );
}

export default BlogSectionHeader;
