// import Parser from "rss-parser";
// const parser = new Parser();

// console.log("📥 Incoming POSTblogopen");
// export async function POST(req) {
// console.log("📥 Incoming POST to /api/bvbj, logopen");
//     console.log(req);
    
//   try {
//     const { rssUrl } = await req.json();

//     if (!rssUrl || typeof rssUrl !== "string") {
//       return new Response(JSON.stringify({ error: "Invalid RSS URL" }), {
//         status: 400,
//       });
//     }

//     const feed = await parser.parseURL(rssUrl);

//     return new Response(JSON.stringify({
//       title: feed.title,
//       items: feed.items,
//     }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(
//       JSON.stringify({
//         error: error.message || "Failed to fetch RSS",
//       }),
//       { status: 500 }
//     );
//   }
// }


// app/api/blogopen/route.js
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { rssUrl } = await req.json();

    if (!rssUrl || typeof rssUrl !== "string") {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const res = await fetch(rssUrl);
    const html = await res.text();

    const $ = cheerio.load(html);

    // Example: extract title and description
    const title = $("title").text();
    const description = $('meta[name="description"]').attr("content") || "";
    console.log(  title, description );
    
    return NextResponse.json({ title, description });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
