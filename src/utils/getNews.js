// 'use server';
// import connectDB from '@/lib/mongodb';
// import News from '@/models/News';
// import { NEWS_API_KEY, NEWS_API_BASE_URL } from '@/config/api.config';

// async function fetchFromNewsAPI(limit) {
//   try {
//     const response = await fetch(
//       `${NEWS_API_BASE_URL}/top-headlines?country=us&category=technology&pageSize=${limit}&apiKey=${NEWS_API_KEY}`,
//       { next: { revalidate: 3600 } }
//     );

//     if (!response.ok) {
//       throw new Error(`News API responded with status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
    
//     return data.articles.map(article => ({
//       title: article.title,
//       description: article.description,
//       urlToImage: article.urlToImage || '/assets/news.svg',
//       category: 'technology',
//       source: article.source.name,
//       publishedAt: article.publishedAt,
//       url: article.url,
//       likes: 0,
//       shares: 0
//     }));
//   } catch (error) {
//     console.error('❌ Error fetching from News API:', error);
//     return [];
//   }
// }

// export async function getNews(skip = 0, limit = 12) {
//   try {
//     await connectDB();

//     // Try to get articles from DB first
//     let articles = await News.find({})
//       .sort({ publishedAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     // If no articles in DB, fetch from API and save
//     if (articles.length === 0) {
//       console.log('No articles in DB, fetching from API...');
//       const apiArticles = await fetchFromNewsAPI(limit);
      
//       if (apiArticles.length > 0) {
//         await News.insertMany(apiArticles);
//         articles = await News.find({})
//           .sort({ publishedAt: -1 })
//           .skip(skip)
//           .limit(limit)
//           .lean();
//       }
//     }

//     return {
//       articles: articles.map(article => ({
//         id: article._id,
//         title: article.title,
//         description: article.description,
//         image: article.urlToImage,
//         category: article.category,
//         source: article.source,
//         publishedAt: article.publishedAt,
//         url: article.url,
//         likes: article.likes || 0,
//         shares: article.shares || 0
//       })),
//       hasMore: articles.length === limit
//     };
//   } catch (error) {
//     console.error('❌ Error in getNews:', error);
//     return {
//       articles: [],
//       hasMore: false
//     };
//   }
// }
