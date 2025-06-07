'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Navigation handler
  const navigate = (path) => {
    router.push(path);
    setIsOpen(false); // Close menu on navigation (for mobile)
  };

  return (
    <>
      <div className="flex justify-between items-center g-px py-5 w-full bg-zinc-900 max-sm:py-4">
        {/* Logo */}
        <div
          className="text-white text-2xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          LOGO
        </div>

        {/* Desktop Navigation */}
        <div className="flex absolute left-2/4 -translate-x-2/4 items-center max-lg:hidden">
          <div className="flex gap-6 items-center">
            <button
              onClick={() => navigate('/')}
              className="gap-2.5 px-5 py-2.5 text-sm font-medium text-white rounded-md border border-zinc-800 bg-neutral-900"
            >
              Home
            </button>
            <button onClick={() => navigate('/news')} className="text-sm text-zinc-500 hover:text-white transition">
              News
            </button>
            <button onClick={() => navigate('/podcasts')} className="text-sm text-zinc-500 hover:text-white transition">
              Podcasts
            </button>
            <button onClick={() => navigate('/resources')} className="text-sm text-zinc-500 hover:text-white transition">
              Resources
            </button>
          </div>
        </div>

        {/* Contact Button */}
        <button
          onClick={() => navigate('/contact')}
          className="gap-2.5 px-3.5 py-2.5 text-sm font-medium bg-yellow-400 rounded-md text-neutral-900 max-sm:text-xs"
        >
          Contact Us
        </button>

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
        <div className="flex flex-col items-start py-4 px-5 bg-zinc-900 lg:hidden gap-4">
          <button onClick={() => navigate('/')} className="text-white text-sm font-medium">Home</button>
          <button onClick={() => navigate('/news')} className="text-zinc-400 text-sm hover:text-white">News</button>
          <button onClick={() => navigate('/podcasts')} className="text-zinc-400 text-sm hover:text-white">Podcasts</button>
          <button onClick={() => navigate('/resources')} className="text-zinc-400 text-sm hover:text-white">Resources</button>
          <button onClick={() => navigate('/contact')} className="px-3.5 py-2.5 bg-yellow-400 text-neutral-900 text-sm rounded-md">
            Contact Us
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;
