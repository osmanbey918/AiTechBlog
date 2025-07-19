import ClientPromptGrid from './ClientPromptGrid';

export default function PromptGrid({ prompts }) {
  if (!Array.isArray(prompts)) {
    console.error('prompts is not an array:', prompts);
    return null;
  }

  return ( 
    <div className="w-full g-px">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="flex flex-col items-center gap-4">
          <span className="px-4 py-1.5 bg-yellow-400/10 text-yellow-400 text-sm rounded-full border border-yellow-400/20">
            AI Prompts Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Explore Our Prompts
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Discover our curated collection of AI prompts designed to enhance your development,
            design, and content creation workflow.
          </p>
        </div>
      </div>

      <ClientPromptGrid prompts={prompts} />

      {/* Bottom CTA */}
      {/* <div className="text-center mt-16 pt-16 border-t border-neutral-800">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-2xl font-semibold text-white">
            Want to Contribute?
          </h3>
          <p className="text-neutral-400 max-w-xl">
            Share your own AI prompts with our community and help others enhance their workflow.
          </p>
          <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors">
            Submit a Prompt
          </button>
        </div>
      </div> */}
    </div>
  );
}
