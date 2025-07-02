export default async function page() {
  const baseUrl = process.env.APP_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${baseUrl}/api/scheduled-news`, {
      method: 'GET',
      cache: 'no-store',
    });

    const data = await res.json();

    return (
      <div className="p-6 text-lg font-medium">
        <h1 className="text-2xl font-bold mb-4">Scheduled News Trigger</h1>
        {res.ok ? (
          <p>✅ Success: {data.message}, Total Articles: {data.totalArticles}</p>
        ) : (
          <p>❌ Failed: {data.error}</p>
        )}
      </div>
    );
  } catch (err) {
    return (
      <div>
        <h1>Error</h1>
        <p>{err.message}</p>
      </div>
    );
  }
}
