// export default function Articlesss() {
//   return (
//     <div className="row-span-1 max-w-[430px] w-full col-span-1 bg-neutral-900 border border-neutral-800 rounded-sm p-6 space-y-4 mx-auto shadow-lg">
//       <h1 className="text-3xl font-bold text-cyan-400">Great Job, Developer 👏</h1>
//       <h2 className="text-xl font-semibold text-white">Your website is running smoothly!</h2>
//       <h2 className="text-lg text-neutral-300">You're doing all the right things.</h2>
//       <h3 className="text-base text-neutral-400 italic">Keep learning, building, and pushing forward.</h3>
//       <h4 className="text-sm text-neutral-500">You're appreciated more than you know. 💙</h4>
//     </div>
//   );
// }


// // pages/article.js
// import Image from 'next/image';

// // Move component and data above main export
// const articles = [
//   {
//     title: 'How AI is Transforming Healthcare Diagnostics',
//     meta: 'May 10, 2023 · 12K views',
//     img: '/assets/home-ss.png',
//   },
//   {
//     title: 'The Complete Guide to Neural Networks in 2023',
//     meta: 'April 28, 2023 · 9.5K views',
//     img: 'https://source.unsplash.com/random/200x150/?ai2',
//   },
//   {
//     title: '5 Practical Applications of Computer Vision',
//     meta: 'June 5, 2023 · 8.7K views',
//     img: 'https://source.unsplash.com/random/200x150/?ai3',
//   },
//   {
//     title: 'Understanding Large Language Models',
//     meta: 'May 22, 2023 · 7.2K views',
//     img: 'https://source.unsplash.com/random/200x150/?ai4',
//   },
//   {
//     title: 'The Future of AI-Powered Search Engines',
//     meta: 'June 12, 2023 · 6.8K views',
//     img: 'https://source.unsplash.com/random/200x150/?ai5',
//   },
// ];

// const Articlesss = () => (
//   <article className="flex flex-col col-span-1 max-w-[430px] bg-neutral-950 rounded-sm overflow-hidden shadow-md hover:shadow-xl transition duration-300">
//     <h3 className="text-xl mb-6 pb-3 relative font-semibold text-white">
//       Popular Articles
//       <span className="absolute bottom-0 left-0 w-10 h-[3px] bg-blue-500"></span>
//     </h3>
//     <div className="flex flex-col gap-4">
//       {articles.map((article, index) => (
//         <div
//           key={index}
//           className={`flex gap-4 pb-4 ${index !== articles.length - 1 ? "border-b border-gray-700" : ""
//             }`}
//         >
//           {/* <Image can be added here if image URL is local or domain is whitelisted */}
//           <div>
//             <h4 className="text-sm font-medium leading-snug mb-1 text-white">
//               {article.title}
//             </h4>
//             <div className="text-xs text-gray-400">{article.meta}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </article>
// );

// // Related article data
// const relatedArticles = [
//   {
//     title: 'The Evolution of Transformer Models',
//     date: 'June 8, 2023',
//     time: '6 min read',
//     img: 'https://source.unsplash.com/random/400x300/?machinelearning',
//   },
//   {
//     title: 'Ethical AI: Challenges and Solutions',
//     date: 'May 28, 2023',
//     time: '9 min read',
//     img: 'https://source.unsplash.com/random/400x300/?aiethics',
//   },
//   {
//     title: 'Building AI Chatbots with GPT-4',
//     date: 'May 20, 2023',
//     time: '7 min read',
//     img: 'https://source.unsplash.com/random/400x300/?chatbot',
//   },
// ];

// export default function Article() {
//   return (
//     <main className="bg-slate-100 py-10 px-6 text-slate-800">
//       <div className="max-w-3xl mx-auto space-y-10">
//         {/* Header */}
//         <header>
//           <span className="inline-block bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
//             Artificial Intelligence
//           </span>
//           <h1 className="text-3xl font-bold mb-2">How GPT-4 is Revolutionizing Content Creation</h1>
//           <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
//             <div className="flex items-center gap-2">
//               <Image
//                 src="https://randomuser.me/api/portraits/women/43.jpg"
//                 alt="Sarah Johnson"
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//               />
//               <span className="font-semibold text-slate-700">Sarah Johnson</span>
//             </div>
//             <span>• May 15, 2023</span>
//             <span>• 8 min read</span>
//             <span>• 12.4K views</span>
//           </div>
//           <Image
//             src="https://source.unsplash.com/random/1200x600/?ai,technology"
//             alt="GPT-4 Content Creation"
//             width={1200}
//             height={600}
//             className="rounded-lg w-full h-[300px] object-cover"
//           />
//         </header>

//         {/* Main Article Content */}
//         <article className="bg-white p-6 rounded-lg shadow">
//           <p className="mb-6 text-lg">
//             The release of GPT-4 has marked a significant milestone in artificial intelligence, particularly in content creation.
//           </p>

//           <h2 className="text-xl font-semibold mb-2">Unprecedented Language Understanding</h2>
//           <ul className="list-disc list-inside mb-6 text-base space-y-1">
//             <li>40% reduction in factual errors</li>
//             <li>65% improvement in maintaining context</li>
//             <li>Better understanding of nuanced instructions</li>
//           </ul>

//           <blockquote className="border-l-4 border-blue-600 pl-4 italic text-slate-500 mb-6">
//             "GPT-4 represents the first AI system where I've felt comfortable using its output with minimal editing..."
//           </blockquote>

//           <h2 className="text-xl font-semibold mb-2">Content Creation Applications</h2>
//           <h3 className="text-lg font-semibold mt-4 mb-2">Marketing Content</h3>
//           <ol className="list-decimal list-inside mb-6 space-y-1">
//             <li>Generate blog drafts quickly</li>
//             <li>Create ad copy variations</li>
//             <li>Personalized email campaigns</li>
//           </ol>

//           <Image
//             src="https://source.unsplash.com/random/800x400/?marketing,content"
//             alt="Marketing Content"
//             width={800}
//             height={400}
//             className="rounded-lg mb-6"
//           />

//           <h3 className="text-lg font-semibold mb-2">Educational Materials</h3>
//           <ul className="list-disc list-inside mb-6 space-y-1">
//             <li>Customized materials for students</li>
//             <li>Practice questions & explanations</li>
//             <li>Interactive scenarios</li>
//           </ul>

//           <h2 className="text-xl font-semibold mb-2">Ethical Considerations</h2>
//           <ul className="list-disc list-inside mb-6 space-y-1">
//             <li>Disclosure of AI-generated content</li>
//             <li>Fact-checking</li>
//             <li>Human oversight</li>
//             <li>Impact on creativity</li>
//           </ul>

//           <p>
//             GPT-4 empowers creators — it won't replace them. Smart collaboration between human and AI is the future.
//           </p>

//           <div className="flex justify-between items-center border-t pt-4 mt-6 text-sm text-slate-600">
//             <div className="flex flex-wrap gap-2">
//               <span className="bg-slate-200 px-3 py-1 rounded-full">AI</span>
//               <span className="bg-slate-200 px-3 py-1 rounded-full">GPT-4</span>
//               <span className="bg-slate-200 px-3 py-1 rounded-full">Content</span>
//               <span className="bg-slate-200 px-3 py-1 rounded-full">NLP</span>
//             </div>
//             <div className="flex gap-2">
//               <button className="bg-slate-200 hover:bg-blue-600 hover:text-white w-8 h-8 flex items-center justify-center rounded-full">
//                 <i className="fab fa-twitter" />
//               </button>
//               <button className="bg-slate-200 hover:bg-blue-600 hover:text-white w-8 h-8 flex items-center justify-center rounded-full">
//                 <i className="fab fa-linkedin-in" />
//               </button>
//               <button className="bg-slate-200 hover:bg-blue-600 hover:text-white w-8 h-8 flex items-center justify-center rounded-full">
//                 <i className="fab fa-facebook-f" />
//               </button>
//             </div>
//           </div>
//         </article>

//         {/* Related Articles */}
//         <section>
//           <h2 className="text-xl font-bold mb-4 border-b pb-2">You Might Also Like</h2>
//           <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//             {relatedArticles.map((item, index) => (
//               <div key={index} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition">
//                 <Image
//                   src={item.img}
//                   alt={item.title}
//                   width={400}
//                   height={300}
//                   className="h-[150px] w-full object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
//                   <p className="text-xs text-slate-500">
//                     {item.date} · {item.time}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Popular Articles */}
//         <Articlesss />

//         {/* Comments */}
//         <section className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Discussion (24)</h2>
//           <form className="space-y-4">
//             <textarea
//               rows="4"
//               className="w-full border rounded-lg p-3 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Share your thoughts..."
//             ></textarea>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-700"
//             >
//               Post Comment
//             </button>
//           </form>
//         </section>
//       </div>
//     </main>
//   );
// }
