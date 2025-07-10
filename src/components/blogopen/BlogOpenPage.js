// import React from 'react';
// import { BlogContent, BlogHero, BlogMetadata, BlogSidebar, SimilarNews } from '@/components/blog/p';

// // ✅ ✅ Move mock data outside the component for stable production build

// const blogData = {
//     title: "The Rise of Artificial Intelligence in Healthcare",
//     publicationDate: "June 15, 2025",
//     category: "Healthcare & Technology",
//     readingTime: "8 min read",
//     authorName: "Dr. Sarah Johnson",
//     backgroundImage: "https://placehold.co/1200x400/2a2a2a/2a2a2a"
// };

// const tableOfContents = [
//     'Introduction',
//     'AI in Diagnostic Imaging',
//     'Predictive Analytics and Disease Prevention',
//     'Personalized Treatment Plans',
//     'Drug Discovery and Research',
//     'AI in Telemedicine',
//     'Ethical Considerations',
//     'The Future of AI in Healthcare',
//     'Conclusion'
// ];

// const similarNewsItems = [
//     {
//         id: '1',
//         image: 'https://placehold.co/400x185/ff6b35/ff6b35',
//         title: 'A Decisive Victory for Progressive Policies',
//         category: 'Politics',
//         likes: '2.2k',
//         shares: '60',
//         date: 'June 14, 2025'
//     },
//     {
//         id: '2',
//         image: 'https://placehold.co/400x185/0066cc/0066cc',
//         title: 'Tech Giants Unveil Cutting-Edge AI Innovations',
//         category: 'Technology',
//         likes: '6k',
//         shares: '92',
//         date: 'June 13, 2025'
//     },
//     {
//         id: '3',
//         image: 'https://placehold.co/400x185/4a90e2/4a90e2',
//         title: 'COVID-19 Variants',
//         category: 'Health',
//         likes: '10k',
//         shares: '124',
//         date: 'June 12, 2025'
//     }
// ];

// // ✅ Use PascalCase for your page component
// const BlogOpenPage = () => {
//     return (
//         <div className="flex w-full flex-col items-start text-white bg-black">
//             <BlogHero
//                 title={blogData.title}
//                 backgroundImage={blogData.backgroundImage}
//             />
//             <div className="flex justify-between w-full max-w-[1440px] mx-auto py-16 gap-16 max-lg:px-8 max-lg:flex-col">
//                 <article className="flex-1">
//                     <BlogContent />
//                     <BlogMetadata
//                         publicationDate={blogData.publicationDate}
//                         category={blogData.category}
//                         readingTime={blogData.readingTime}
//                         authorName={blogData.authorName}
//                     />
//                 </article>
//                 <aside className="w-[400px] max-lg:w-full">
//                     {/* ✅ Add optional chaining to avoid undefined errors */}
//                     <BlogSidebar tableOfContents={tableOfContents ?? []} />
//                 </aside>
//             </div>
//             <SimilarNews items={similarNewsItems ?? []} />
            
//         </div>
//     );
// };

// export default BlogOpenPage;











// "use client";
// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { MDXRemote } from 'next-mdx-remote/rsc';

// export default function BlogOpenPage({ meta, content }) {
//   return (
//     <main className="min-h-screen bg-gray-950 text-gray-100">
//       <BlogHero 
//         title={meta.title} 
//         backgroundImage={meta.coverImage} 
//         category={meta.category}
//       />
      
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 sm:px-6 py-8 sm:py-12">
//         {/* Main Content */}
//         <article className="w-full lg:w-2/3">
//           {/* Metadata */}
//           <BlogMetadata 
//             author={meta.author}
//             date={meta.date}
//             readTime={meta.readTime}
//             views={meta.views}
//             avatar={meta.avatar}
//           />
          
//           {/* Content */}
//           <div className="prose prose-invert prose-lg max-w-none mt-8">
//             <MDXRemote source={content} />
//           </div>
          
//           {/* Engagement Metrics */}
//           <EngagementMetrics 
//             likes={meta.likes}
//             comments={meta.comments}
//             shares={meta.shares}
//           />
//         </article>
        
//         {/* Sidebar */}
//         <aside className="w-full lg:w-1/3 mt-8 lg:mt-0">
//           <BlogSidebar
//             tableOfContents={meta.tableOfContents}
//             similarPosts={meta.similarPosts}
//           />
//         </aside>
//       </div>
//     </main>
//   );
// }

// // Component Definitions
// function BlogHero({ title, backgroundImage, category }) {
//   return (
//     <section className="relative h-96 w-full">
//       {backgroundImage && (
//         <Image
//           src={backgroundImage}
//           alt={title}
//           fill
//           className="object-cover brightness-75"
//           priority
//         />
//       )}
//       <div className="absolute inset-0 flex items-center justify-center text-center px-4">
//         <div className="max-w-3xl">
//           {category && (
//             <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-emerald-600 to-cyan-500 text-white rounded-full mb-4">
//               {category}
//             </span>
//           )}
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
//             {title}
//           </h1>
//         </div>
//       </div>
//     </section>
//   );
// }

// function BlogMetadata({ author, date, readTime, views, avatar }) {
//   return (
//     <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 border-b border-gray-800 pb-6">
//       {avatar && (
//         <div className="flex items-center gap-2 group">
//           <div className="relative w-8 h-8">
//             <Image
//               src={avatar}
//               alt={author || 'Author avatar'}
//               fill
//               className="rounded-full object-cover group-hover:ring-2 group-hover:ring-cyan-500 transition-all"
//             />
//           </div>
//           <span className="font-medium text-gray-300 hover:text-cyan-400 transition-colors">
//             {author}
//           </span>
//         </div>
//       )}

//       {date && (
//         <time dateTime={date} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
//           <span className="text-gray-500">📅</span> 
//           <span>{date}</span>
//         </time>
//       )}
//       {readTime && (
//         <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
//           <span className="text-gray-500">⏱</span>
//           <span>{readTime}</span>
//         </span>
//       )}
//       {views && (
//         <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
//           <span className="text-gray-500">👁</span>
//           <span>{views}</span>
//         </span>
//       )}
//     </div>
//   );
// }

// function EngagementMetrics({ likes, comments, shares }) {
//   return (
//     <div className="flex items-center gap-4 mt-12 pt-6 border-t border-gray-800">
//       <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors">
//         <span className="text-gray-300">{likes}</span>
//         <Image src="/assets/like.svg" width={20} height={20} alt="Likes" />
//       </button>
//       <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors">
//         <span className="text-gray-300">{comments}</span>
//         <Image src="/assets/comment.svg" width={20} height={20} alt="Comments" />
//       </button>
//       <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors">
//         <span className="text-gray-300">{shares}</span>
//         <Image src="/assets/share.svg" width={20} height={20} alt="Shares" />
//       </button>
//     </div>
//   );
// }

// function BlogSidebar({ tableOfContents, similarPosts }) {
//   return (
//     <div className="sticky top-6 space-y-8">
//       {/* Table of Contents */}
//       {tableOfContents?.length > 0 && (
//         <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
//           <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-800">
//             Table of Contents
//           </h3>
//           <nav className="space-y-2">
//             {tableOfContents.map((item, index) => (
//               <a 
//                 key={index} 
//                 href={`#${item.id}`}
//                 className="block text-gray-300 hover:text-cyan-400 transition-colors py-1.5"
//               >
//                 <span className="inline-block w-2 h-2 mr-3 bg-cyan-500 rounded-full"></span>
//                 {item.title}
//               </a>
//             ))}
//           </nav>
//         </div>
//       )}
      
//       {/* Similar Posts */}
//       {similarPosts?.length > 0 && (
//         <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
//           <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-800">
//             Similar Articles
//           </h3>
//           <div className="space-y-4">
//             {similarPosts.map(post => (
//               <Link 
//                 key={post.slug} 
//                 href={`/blog/${post.slug}`}
//                 className="group flex gap-3"
//               >
//                 <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
//                   <Image
//                     src={post.image}
//                     alt={post.title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform"
//                   />
//                 </div>
//                 <div>
//                   <h4 className="text-gray-200 group-hover:text-cyan-400 transition-colors line-clamp-2">
//                     {post.title}
//                   </h4>
//                   <p className="text-xs text-gray-400 mt-1">{post.date}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }