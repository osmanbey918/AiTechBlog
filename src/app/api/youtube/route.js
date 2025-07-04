// app/api/youtube/route.js
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function GET(request) {
  console.log("YOUTUBE_API_KEY:", YOUTUBE_API_KEY); 

  const { searchParams } = new URL(request.url);

  const maxResults = searchParams.get("maxResults") || 3;
  const query = searchParams.get("query") || "technology AI news";
  const pageToken = searchParams.get("pageToken") || "";

  if (!YOUTUBE_API_KEY) {
    return new Response(JSON.stringify({ error: "YouTube API key is not configured" }), {
      status: 500,
    });
  }

  try {
    const url = `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=video&maxResults=${maxResults}&pageToken=${pageToken}&key=${YOUTUBE_API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: { message: "Unknown error" } }));
      return new Response(JSON.stringify({ error: errorData.error?.message || "Fetch failed" }), {
        status: res.status,
      });
    }

    const data = await res.json();

    const response = {
      videos: data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
      })),
      nextPageToken: data.nextPageToken,
      totalResults: data.pageInfo.totalResults,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error: " + err.message }), {
      status: 500,
    });
  }
}
