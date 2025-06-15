'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Navigation handler
  const navigate = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/news', label: 'News' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/resources', label: 'Resources' },
  ];

  return (
    <nav 
      className={` py-2 w-full transition-all duration-300 ${
        scrolled ? 'bg-zinc-900/95 backdrop-blur-sm shadow-lg' : 'bg-zinc-900'
      }`}
    >
      <div className="max-w-7xl mx-auto g-px">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Image 
              src="/assets/Logo.svg" 
              alt="AI Tech Blog Logo" 
              width={32} 
              height={32} 
              className="mr-2"
            />
            <span className="text-white font-bold text-xl">AI Tech Blog</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative px-3 py-2 text-sm transition-colors duration-200 ${
                  pathname === item.path
                    ? 'text-white font-medium'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
                {pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform origin-left" />
                )}
              </button>
            ))}
            <button
              onClick={() => navigate('/contact')}
              className="px-4 py-2 text-sm font-medium bg-yellow-400 text-neutral-900 rounded-md
                       hover:bg-yellow-500 transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ${
                isOpen ? 'rotate-45 top-3' : 'top-1'
              }`} />
              <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'top-3'
              }`} />
              <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ${
                isOpen ? '-rotate-45 top-3' : 'top-5'
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-zinc-800">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                  pathname === item.path
                    ? 'text-white bg-zinc-800 font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigate('/contact')}
              className="w-full mt-4 px-4 py-2 text-sm font-medium bg-yellow-400 text-neutral-900 rounded-md
                       hover:bg-yellow-500 transition-colors duration-200"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
