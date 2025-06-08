import React from 'react';

const Footer = () => {
  // NewBadge component
  const NewBadge = () => (
    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400">
      New
    </span>
  );

  // ResourceButton component
  const ResourceButton = ({ children }) => (
    <button className="flex flex-row flex-wrap  sm:flex-col  items-center justify-between w-full px-3 py-2 text-sm rounded-md border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition-colors">
      <span className="text-neutral-400">{children}</span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className="text-yellow-400"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.1875 3.3125L14.625 3.3125C14.7742 3.3125 14.9173 3.37176 15.0227 3.47725C15.1282 3.58274 15.1875 3.72582 15.1875 3.875V12.3125C15.1875 12.6232 14.9357 12.875 14.625 12.875C14.3143 12.875 14.0625 12.6232 14.0625 12.3125V5.233L3.77275 15.5227C3.55308 15.7424 3.19692 15.7424 2.97725 15.5227C2.75758 15.3031 2.75758 14.9469 2.97725 14.7273L13.267 4.4375L6.1875 4.4375C5.87684 4.4375 5.625 4.18566 5.625 3.875C5.625 3.56434 5.87684 3.3125 6.1875 3.3125Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );

  // NavigationSection component
  const NavigationSection = ({ title, links }) => (
    <div className="w-full sm:w-auto">
      <h2 className="mb-4 text-lg font-medium text-white">{title}</h2>
      <nav className="space-y-3">
        {links.map((link, index) => (
          <div key={index} className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              {link.text}
            </a>
            {/* {link.hasNew && <NewBadge />} */}
          </div>
        ))}
      </nav>
    </div>
  );

  // ResourceSection component
  const ResourceSection = () => {
    const resources = [
      'Whitepapers',
      'Ebooks',
      'Reports',
      'Research Papers'
    ];

    return (
      <div className="w-full ">
        <h2 className="mb-4 text-lg font-medium text-white">Resources</h2>
        <div className="flex flex-row flex-wrap gap-3 sm:flex-row sm:space-y-3">
          {resources.map((resource, index) => (
            <ResourceButton key={index}>
              {resource}
            </ResourceButton>
          ))}
        </div>
      </div>
    );
  };

  // Navigation data
  const sections = [
    {
      title: "Home",
      links: [
        { text: 'Features', hasNew: false },
        { text: 'Blogs', hasNew: false },
        { text: 'Resources', hasNew: true },
        { text: 'Testimonials', hasNew: false },
        { text: 'Contact Us', hasNew: false },
        { text: 'Newsletter', hasNew: false }
      ]
    },
    {
      title: "News",
      links: [
        { text: 'Trending Stories', hasNew: false },
        { text: 'Featured Videos', hasNew: false },
        { text: 'Technology', hasNew: false },
        { text: 'Health', hasNew: false },
        { text: 'Politics', hasNew: false },
        { text: 'Environment', hasNew: false }
      ]
    },
    {
      title: "Blogs",
      links: [
        { text: 'Quantum Computing', hasNew: false },
        { text: 'AI Ethics', hasNew: false },
        { text: 'Space Exploration', hasNew: false },
        { text: 'Biotechnology', hasNew: true },
        { text: 'Renewable Energy', hasNew: false },
        { text: 'Biohacking', hasNew: false }
      ]
    },
    {
      title: "Podcasts",
      links: [
        { text: 'AI Revolution', hasNew: false },
        { text: 'AI Revolution', hasNew: true },
        { text: 'TechTalk AI', hasNew: false },
        { text: 'AI Conversations', hasNew: false }
      ]
    }
  ];

  return (
    <footer className="bg-black py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {sections.map((section, index) => (
            <NavigationSection
              key={index}
              title={section.title}
              links={section.links}
            />
          ))}
          <ResourceSection />
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800">
          <p className="text-sm text-neutral-400 text-center">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
