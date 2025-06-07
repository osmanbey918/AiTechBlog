import React from 'react';

const Footer = () => {
  // NewBadge component inline
  const NewBadge = () => (
    <span className="gap-2.5 px-2.5 py-0.5 text-xs tracking-tight leading-5 text-white rounded border border-solid bg-zinc-900 border-neutral-800">
      New
    </span>
  );

  // ResourceButton component inline
  const ResourceButton = ({ children }) => (
    <button className="flex gap-1 items-center px-3.5 py-2 mb-3 rounded-md border border-solid bg-neutral-900 border-neutral-800">
      <span className="text-sm tracking-tight leading-5 text-neutral-400">
        {children}
      </span>
      <div>
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="resource-button-icon"
          style={{ width: '18px', height: '18px' }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.1875 3.3125L14.625 3.3125C14.7742 3.3125 14.9173 3.37176 15.0227 3.47725C15.1282 3.58274 15.1875 3.72582 15.1875 3.875V12.3125C15.1875 12.6232 14.9357 12.875 14.625 12.875C14.3143 12.875 14.0625 12.6232 14.0625 12.3125V5.233L3.77275 15.5227C3.55308 15.7424 3.19692 15.7424 2.97725 15.5227C2.75758 15.3031 2.75758 14.9469 2.97725 14.7273L13.267 4.4375L6.1875 4.4375C5.87684 4.4375 5.625 4.18566 5.625 3.875C5.625 3.56434 5.87684 3.3125 6.1875 3.3125Z"
            fill="#FFD11A"
          />
        </svg>
      </div>
    </button>
  );

  // NavigationSection component inline
  const NavigationSection = ({ title, links }) => (
    <section className="flex flex-col flex-1 gap-7 items-start max-md:flex-[1_1_calc(50%_-_15px)] max-md:min-w-[200px] max-sm:flex-none max-sm:w-full">
      <h2 className="w-full text-lg font-medium tracking-tight leading-6 text-white">
        {title}
      </h2>
      <nav className="flex flex-col gap-3 items-start w-full">
        {links.map((link, index) => (
          <div key={index} className={link.hasNew ? "flex gap-2 items-center w-full" : "w-full"}>
            <a
              href="#"
              className="w-full text-sm tracking-tight leading-5 text-stone-500 hover:text-stone-400 transition-colors"
            >
              {link.text}
            </a>
            {link.hasNew && <NewBadge />}
          </div>
        ))}
      </nav>
    </section>
  );

  // ResourceSection component inline
  const ResourceSection = () => {
    const resources = [
      'Whitepapers',
      'Ebooks',
      'Reports',
      'Research Papers'
    ];

    return (
      <section className="flex flex-col flex-1 gap-7 items-start max-md:flex-[1_1_calc(50%_-_15px)] max-md:min-w-[200px] max-sm:flex-none max-sm:w-full">
        <h2 className="w-full text-lg font-medium tracking-tight leading-6 text-white">
          Resources
        </h2>
        <div className="flex flex-col gap-3 items-start w-full">
          {resources.map((resource, index) => (
            <ResourceButton key={index}>
              {resource}
            </ResourceButton>
          ))}
        </div>
      </section>
    );
  };

  // Data for navigation sections
  const homeLinks = [
    { text: 'Features', hasNew: false },
    { text: 'Blogs', hasNew: false },
    { text: 'Resources', hasNew: true },
    { text: 'Testimonials', hasNew: false },
    { text: 'Contact Us', hasNew: false },
    { text: 'Newsletter', hasNew: false }
  ];

  const newsLinks = [
    { text: 'Trending Stories', hasNew: false },
    { text: 'Featured Videos', hasNew: false },
    { text: 'Technology', hasNew: false },
    { text: 'Health', hasNew: false },
    { text: 'Politics', hasNew: false },
    { text: 'Environment', hasNew: false }
  ];

  const blogLinks = [
    { text: 'Quantum Computing', hasNew: false },
    { text: 'AI Ethics', hasNew: false },
    { text: 'Space Exploration', hasNew: false },
    { text: 'Biotechnology', hasNew: true },
    { text: 'Renewable Energy', hasNew: false },
    { text: 'Biohacking', hasNew: false }
  ];

  const podcastLinks = [
    { text: 'AI Revolution', hasNew: false },
    { text: 'AI Revolution', hasNew: true },
    { text: 'TechTalk AI', hasNew: false },
    { text: 'AI Conversations', hasNew: false }
  ];

  return (
    <footer className="flex gap-12 items-start px-0 py-16 w-full border-b border-solid border-b-neutral-800 max-md:flex-wrap max-md:gap-8 max-sm:flex-col max-sm:gap-6 max-sm:px-0 max-sm:py-10">
      <NavigationSection title="Home" links={homeLinks} />
      <NavigationSection title="News" links={newsLinks} />
      <NavigationSection title="Blogs" links={blogLinks} />
      <NavigationSection title="Podcasts" links={podcastLinks} />
      <ResourceSection />
    </footer>
  );
};

export default Footer;


// import * as React from "react";
// import LegalLinks from "./LegalLinks";
// import SocialIcons from "./SocialIcons";

// function Footer() {
//   return (
//     <footer className="flex justify-between items-start px-0 py-6 w-full max-md:flex-col max-md:gap-4 max-md:items-center max-sm:px-0 max-sm:py-5">
//       <LegalLinks />
//       <p className="text-sm tracking-tight leading-5 text-stone-500">
//         © 2024 FutureTech. All rights reserved.
//       </p>
//       <SocialIcons />
//     </footer>
//   );
// }

// export default Footer;
// import * as React from "react";

// function SocialIcons() {
//   return (
//     <div className="flex gap-3.5 items-start max-md:-order-1 max-sm:justify-center">
//       <div>
//         <div
//           dangerouslySetInnerHTML={{
//             __html:
//               "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"social-icon\" style=\"width: 20px; height: 20px\"> <path d=\"M17.5475 5.98396C17.5552 6.15996 17.5552 6.32796 17.5552 6.50396C17.563 11.84 13.6426 18 6.47319 18C4.35865 18 2.2827 17.368 0.5 16.184C0.808692 16.224 1.11738 16.24 1.42608 16.24C3.1779 16.24 4.88343 15.632 6.26483 14.504C4.59789 14.472 3.1316 13.344 2.62226 11.696C3.20877 11.816 3.81072 11.792 4.3818 11.624C2.56824 11.256 1.26401 9.59997 1.2563 7.67197C1.2563 7.65597 1.2563 7.63997 1.2563 7.62397C1.79651 7.93597 2.40617 8.11197 3.02356 8.12797C1.31803 6.94396 0.78554 4.58396 1.81966 2.73595C3.80301 5.26396 6.72015 6.79196 9.85337 6.95996C9.53696 5.55996 9.96913 4.08796 10.9801 3.09595C12.5467 1.56795 15.0162 1.64795 16.498 3.27195C17.37 3.09595 18.2112 2.75995 18.9752 2.28795C18.682 3.22395 18.0723 4.01596 17.262 4.51996C18.0337 4.42396 18.79 4.20796 19.5 3.88795C18.9752 4.70396 18.3115 5.40796 17.5475 5.98396Z\" fill=\"white\"></path> </svg>",
//           }}
//         />
//       </div>
//       <div>
//         <div
//           dangerouslySetInnerHTML={{
//             __html:
//               "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"social-icon\" style=\"width: 20px; height: 20px\"> <path d=\"M11.2812 10.1897C11.2812 13.332 8.75578 15.8793 5.6407 15.8793C2.52561 15.8793 0 13.3314 0 10.1897C0 7.04806 2.52542 4.5 5.6407 4.5C8.75597 4.5 11.2812 7.04749 11.2812 10.1897Z\" fill=\"white\"></path> <path d=\"M17.4688 10.19C17.4688 13.1477 16.2061 15.5464 14.6485 15.5464C13.0908 15.5464 11.8281 13.1477 11.8281 10.19C11.8281 7.23219 13.0906 4.8335 14.6483 4.8335C16.2059 4.8335 17.4686 7.23142 17.4686 10.19\" fill=\"white\"></path> <path d=\"M19.9998 10.1897C19.9998 12.8391 19.5557 14.9882 19.0078 14.9882C18.4599 14.9882 18.0161 12.8397 18.0161 10.1897C18.0161 7.53965 18.4601 5.39111 19.0078 5.39111C19.5555 5.39111 19.9998 7.53946 19.9998 10.1897Z\" fill=\"white\"></path> </svg>",
//           }}
//         />
//       </div>
//       <div>
//         <div
//           dangerouslySetInnerHTML={{
//             __html:
//               "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"social-icon\" style=\"width: 20px; height: 20px\"> <path d=\"M17.3873 1.3335H2.61303C2.27368 1.3335 1.94822 1.4683 1.70826 1.70826C1.4683 1.94822 1.3335 2.27368 1.3335 2.61303V17.3873C1.3335 17.7266 1.4683 18.0521 1.70826 18.2921C1.94822 18.532 2.27368 18.6668 2.61303 18.6668H17.3873C17.7266 18.6668 18.0521 18.532 18.2921 18.2921C18.532 18.0521 18.6668 17.7266 18.6668 17.3873V2.61303C18.6668 2.27368 18.532 1.94822 18.2921 1.70826C18.0521 1.4683 17.7266 1.3335 17.3873 1.3335ZM6.49979 16.0993H3.89377V7.82146H6.49979V16.0993ZM5.19498 6.67433C4.89937 6.67266 4.61088 6.58347 4.36592 6.418C4.12095 6.25254 3.93049 6.01821 3.81857 5.7446C3.70666 5.471 3.6783 5.17037 3.73707 4.88066C3.79585 4.59095 3.93913 4.32514 4.14883 4.11678C4.35853 3.90843 4.62525 3.76686 4.91533 3.70994C5.20541 3.65302 5.50586 3.68331 5.77874 3.79699C6.05162 3.91066 6.28472 4.10262 6.44861 4.34864C6.6125 4.59466 6.69984 4.88372 6.69961 5.17933C6.7024 5.37724 6.66531 5.57369 6.59056 5.75697C6.51581 5.94024 6.40493 6.10659 6.26452 6.2461C6.12411 6.38561 5.95705 6.49542 5.7733 6.56899C5.58955 6.64257 5.39287 6.67839 5.19498 6.67433ZM16.1053 16.1066H13.5005V11.5842C13.5005 10.2505 12.9336 9.83887 12.2017 9.83887C11.429 9.83887 10.6706 10.4215 10.6706 11.6179V16.1066H8.06461V7.82748H10.5707V8.97461H10.6044C10.856 8.46544 11.7371 7.59516 13.0816 7.59516C14.5357 7.59516 16.1066 8.45822 16.1066 10.986L16.1053 16.1066Z\" fill=\"white\"></path> </svg>",
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default SocialIcons;
// import * as React from "react";

// function LegalLinks() {
//   return (
//     <div className="flex gap-2 items-center max-sm:flex-wrap max-sm:justify-center">
//       <p className="text-sm tracking-tight leading-5 text-stone-500">
//         Terms &amp; Conditions
//       </p>
//       <div className="w-px bg-neutral-800 h-[18px]" />
//       <p className="text-sm tracking-tight leading-5 text-stone-500">
//         Privacy Policy
//       </p>
//     </div>
//   );
// }

// export default LegalLinks;
