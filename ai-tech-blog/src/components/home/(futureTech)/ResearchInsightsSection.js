import * as React from "react";

function ResearchInsightsSection() {
  const features = [
    {
      title: "Depth",
      description: "500+ research articles for in-depth understanding."
    },
    {
      title: "Graphics",
      description: "Visual aids and infographics to enhance comprehension."
    },
    {
      title: "Trends",
      description: "Explore emerging trends in future technology research."
    },
    {
      title: "Contributors",
      description: "Contributions from tech researchers and academics."
    }
  ];

  return (
    <section className="flex gap-20 items-center px-40 w-full border border-neutral-800 max-md:gap-16 max-md:px-20 max-sm:flex-col max-sm:gap-10 max-sm:px-5">
      <div className="flex flex-col gap-12 justify-center items-start max-sm:gap-8 max-sm:pt-10">
        <GeometricLogo />
        <SectionHeader />
      </div>
      <div className="flex flex-col flex-1 gap-8 items-start py-20 pl-20 border border-neutral-800 max-md:py-16 max-md:pl-16 max-sm:py-10 max-sm:border max-sm:border-l">
        <div className="flex gap-8 items-start w-full max-sm:flex-col max-sm:gap-5">
          <FeatureCard
            title={features[0].title}
            description={features[0].description}
          />
          <FeatureCard
            title={features[1].title}
            description={features[1].description}
          />
        </div>
        <div className="flex gap-8 items-start w-full max-sm:flex-col max-sm:gap-5">
          <FeatureCard
            title={features[2].title}
            description={features[2].description}
          />
          <FeatureCard
            title={features[3].title}
            description={features[3].description}
          />
        </div>
      </div>
    </section>
  );
}

function GeometricLogo() {
  return (
    <div className="flex flex-col gap-12 max-sm:gap-8">
      <div className="flex items-center">
        <div className="bg-yellow-400 h-[25px] w-[49.5px]" />
        <div className="bg-neutral-700 h-[25px] w-[21px]" />
      </div>
      <div className="flex items-center translate-x-[25.36px]">
        <div className="origin-bottom-left bg-neutral-700 h-[25px] rotate-[60deg] w-[21px]" />
        <div className="origin-bottom-right bg-neutral-700 h-[25px] rotate-[-60deg] w-[21px]" />
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <header className="flex flex-col gap-4 items-start w-[519px] max-md:w-[400px] max-sm:w-full">
      <h1 className="w-full text-4xl font-semibold tracking-tighter text-white leading-[52px] max-md:text-3xl max-md:tracking-tighter max-sm:text-2xl max-sm:tracking-tight">
        Research Insights Blogs
      </h1>
      <p className="w-full text-lg tracking-tight leading-7 text-neutral-400 max-md:text-base max-md:tracking-tight max-sm:text-sm max-sm:tracking-tight">
        Dive deep into future technology concepts with our research section.
      </p>
    </header>
  );
}

function FeatureCard({ title, description }) {
  return (
    <article className="flex flex-col flex-1 gap-5 items-start p-10 rounded-xl border bg-zinc-900 border-neutral-800 max-md:p-8 max-sm:p-5">
      <h2 className="w-full text-2xl font-medium tracking-tighter leading-9 text-white max-md:text-xl max-md:tracking-tight max-sm:text-lg max-sm:tracking-tight">
        {title}
      </h2>
      <p className="w-full text-lg tracking-tight leading-7 text-neutral-400 max-md:text-base max-md:tracking-tight max-sm:text-sm max-sm:tracking-tight">
        {description}
      </p>
    </article>
  );
}

export default ResearchInsightsSection;
