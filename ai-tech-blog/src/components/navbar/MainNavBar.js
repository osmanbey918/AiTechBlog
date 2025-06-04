'use client';
import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center g-px py-5 w-full bg-zinc-900 max-sm:py-4">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">LOGO</div>

        {/* Desktop Navigation */}
        <div className="flex absolute left-2/4 -translate-x-2/4 items-center max-lg:hidden">
          <div className="flex gap-6 items-center">
            <div className="gap-2.5 px-5 py-2.5 text-sm font-medium text-white rounded-md border border-zinc-800 bg-neutral-900">
              Home
            </div>
            <div className="text-sm text-zinc-500 nav-link">News</div>
            <div className="text-sm text-zinc-500">Podcasts</div>
            <div className="text-sm text-zinc-500">Resources</div>
          </div>
        </div>

        {/* Contact Button */}
        <div className="gap-2.5 px-3.5 py-2.5 text-sm font-medium bg-yellow-400 rounded-md text-neutral-900 max-sm:text-xs">
          Contact Us
        </div>

        {/* Hamburger Button */}
        <div
          className="lg:hidden flex flex-col justify-between w-6 h-5 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="h-0.5 bg-white w-full rounded" />
          <span className="h-0.5 bg-white w-full rounded" />
          <span className="h-0.5 bg-white w-full rounded" />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col items-start py-4 bg-zinc-900 lg:hidden gap-4">
          <div className="text-white text-sm font-medium">Home</div>
          <div className="text-zinc-400 text-sm">News</div>
          <div className="text-zinc-400 text-sm">Podcasts</div>
          <div className="text-zinc-400 text-sm">Resources</div>
          <div className="px-3.5 py-2.5 bg-yellow-400 text-neutral-900 text-sm rounded-md">
            Contact Us
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
