import Image from 'next/image';
import React from 'react';
import Footer from './Footer';

const ConnectSection = () => {
  const features = [
    {
      title: "Resource Access",
      description: "Visitors can access a wide range of resources, including ebooks, whitepapers, reports."
    },
    {
      title: "Community Forum",
      description: "Join our active community forum to discuss industry trends and collaborate with peers."
    },
    {
      title: "Tech Events",
      description: "Stay updated on upcoming tech events, webinars and conferences to enhance your knowledge."
    }
  ];

  return (
    <section className="box-border flex flex-col gap-12 justify-center items-start p-20 w-full border-t border-b border-solid bg-zinc-900 border-b-neutral-800 border-t-neutral-800 max-md:gap-10 max-md:px-10 max-md:py-16 max-sm:gap-8 max-sm:px-5 max-sm:py-10">
      <div className="flex gap-16 items-center w-full max-md:flex-col max-md:gap-10 max-md:text-center max-sm:gap-8">
        {/* Replaced Logo with + */}
        {/* <div className="text-4xl font-bold text-white">+</div> */}
        <Image src={"/assets/Logo.svg"} alt="Logo" width={50} height={50} className="w-12 h-12" />
        <div className="flex flex-col flex-1 gap-5 justify-center items-start">
          <header className="flex flex-col gap-2.5 justify-center items-start w-full">
            <div className="gap-2.5 px-2 py-1 text-base font-medium tracking-tight leading-6 text-white rounded bg-zinc-800 max-sm:text-sm">
              Learn, Connect, and Innovate
            </div>
            <h1 className="w-full text-5xl font-medium tracking-tighter text-white leading-[57.2px] max-md:text-4xl max-sm:text-3xl max-sm:leading-8">
              Be Part of the Future Tech Revolution
            </h1>
          </header>
          <p className="w-full text-base tracking-tight leading-6 text-zinc-500 max-sm:text-sm">
            Immerse yourself in the world of future technology. Explore our comprehensive resources.
          </p>
        </div>
      </div>
      <div className="box-border flex gap-2.5 items-start p-2.5 w-full rounded-xl border border-solid bg-neutral-900 border-neutral-800 max-md:flex-col max-md:gap-5 max-sm:p-1.5">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      {/* <Footer/> */}
    </section>
  );
};

const FeatureCard = ({ title, description }) => {
  return (
    <article className="flex flex-col flex-1 gap-4 items-start p-8 rounded-xl border border-solid bg-zinc-900 border-neutral-800 max-md:p-6 max-sm:p-5">
      <header className="flex gap-4 items-center w-full">
        <h3 className="flex-1 text-lg font-semibold tracking-tight leading-7 text-white max-sm:text-base">
          {title}
        </h3>
        <button className="flex gap-2.5 items-start p-3 bg-yellow-400 rounded-[100px]">
          <ArrowIcon />
        </button>
      </header>
      <p className="w-full text-base tracking-tight leading-6 text-neutral-400 max-sm:text-sm">
        {description}
      </p>
    </article>
  );
};

const ArrowIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="card-icon"
      style={{ width: '20px', height: '20px' }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.875 3.125L16.25 3.125C16.4158 3.125 16.5747 3.19085 16.6919 3.30806C16.8092 3.42527 16.875 3.58424 16.875 3.75V13.125C16.875 13.4702 16.5952 13.75 16.25 13.75C15.9048 13.75 15.625 13.4702 15.625 13.125V5.25888L4.19194 16.6919C3.94786 16.936 3.55214 16.936 3.30806 16.6919C3.06398 16.4479 3.06398 16.0521 3.30806 15.8081L14.7411 4.375L6.875 4.375C6.52982 4.375 6.25 4.09518 6.25 3.75C6.25 3.40482 6.52982 3.125 6.875 3.125Z"
        fill="#141414"
      />
    </svg>
  );
};

export default ConnectSection;
