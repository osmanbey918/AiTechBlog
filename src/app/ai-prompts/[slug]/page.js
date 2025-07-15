import { getPromptBySlug } from '@/lib/markdown';
import PromptDetails from '@/components/ai/PromptDetails';

export async function generateMetadata({ params }) {
  const prompt = await getPromptBySlug(params.slug);
  
  return {
    title: prompt?.title ? `${prompt.title} - AI Prompt` : 'Prompt Not Found',
    description: prompt?.description || 'AI prompt details and usage guide',
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  
  const prompt = await getPromptBySlug(slug);
  
  if (!prompt) {
    return (
      <div className="min-h-[80vh] bg-neutral-900/50 flex items-center justify-center px-4">
        <div className="text-center max-w-lg mx-auto p-8 rounded-xl border border-neutral-800 bg-neutral-900/50">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-yellow-400/10 mb-4">
            <svg
              className="w-8 h-8 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Prompt Not Found</h1>
          <p className="text-neutral-400">
            The prompt you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <a 
            href="/ai" 
            className="inline-flex mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Browse All Prompts
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-neutral-900/50 border-b border-neutral-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex text-sm">
            <a href="/" className="text-neutral-400 hover:text-yellow-400">Home</a>
            <span className="text-neutral-600 mx-2">/</span>
            <a href="/ai" className="text-neutral-400 hover:text-yellow-400">AI Prompts</a>
            <span className="text-neutral-600 mx-2">/</span>
            <span className="text-yellow-400">{prompt.title}</span>
          </nav>
        </div>
      </div>

      <main className="min-h-screen bg-gradient-to-b from-neutral-900 to-black py-16">
        <div className="container mx-auto px-4">
          <PromptDetails prompt={prompt} />
        </div>
      </main>
    </>
  );
}
