const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideos = async ({ maxResults = 3, query = 'technology AI news', pageToken = '' }) => {
    try {
        if (!YOUTUBE_API_KEY) {
            throw new Error('YouTube API key is not configured');
        }

        const response = await fetch(
            `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&pageToken=${pageToken}&key=${YOUTUBE_API_KEY}`,
            { next: { revalidate: 3600 } }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        return {
            videos: data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.high.url,
                channelTitle: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt
            })),
            nextPageToken: data.nextPageToken,
            totalResults: data.pageInfo.totalResults
        };
    } catch (error) {
        console.error('Error fetching videos:', error);
        return { videos: [], nextPageToken: null, totalResults: 0 };
    }
};
