import { getPromptBySlug } from '@/lib/markdown';
import PromptDetails from '@/components/ai/PromptDetails';

export default async function PromptPage({ params }) {
  const { slug } = params;
  console.log('Loading prompt for slug:', slug);
  
  const prompt = await getPromptBySlug(slug);
  console.log('Prompt data:', {
    title: prompt?.title,
    hasUsageTips: Boolean(prompt?.usageTips),
    hasExpectedResults: Boolean(prompt?.expectedResults),
    tipCount: prompt?.usageTips?.length,
    resultCount: prompt?.expectedResults ? Object.keys(prompt.expectedResults).length : 0
  });
  
  if (!prompt) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Prompt Not Found</h1>
          <p className="text-gray-400">
            The prompt you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16">
      <PromptDetails prompt={prompt} />
    </main>
  );
}
