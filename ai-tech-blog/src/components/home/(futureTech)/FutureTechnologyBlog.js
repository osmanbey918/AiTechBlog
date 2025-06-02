"use client";
function FutureTechnologyBlog() {
    const features = [
        {
            title: "Quantity",
            description: "Over 1,000 articles on emerging tech trends and breakthroughs.",
        },
        {
            title: "Variety",
            description: "Articles cover fields like AI, robotics, biotechnology, and more.",
        },
        {
            title: "Frequency",
            description: "Fresh content added daily to keep you up to date.",
        },
        {
            title: "Authoritative",
            description: "Written by our team of tech experts and industry professionals.",
        },
    ];

    return (
        <section className="flex gap-20 items-center px-40 w-full max-md:gap-16 max-md:px-20 max-sm:flex-col max-sm:gap-10 max-sm:px-5">
            <header className="flex flex-col gap-12 justify-center items-start max-sm:gap-8">
                <TechBlogIcon />
                <div className="flex flex-col gap-4 items-start w-[519px] max-md:w-[400px] max-sm:w-full">
                    <h1 className="w-full text-4xl font-semibold tracking-tighter text-white leading-[60px] max-md:text-3xl max-md:tracking-tighter max-sm:text-2xl max-sm:tracking-tight">
                        Future Technology Blog
                    </h1>
                    <p className="w-full text-lg tracking-tight leading-7 text-neutral-400 max-md:text-base max-md:tracking-tight max-sm:text-sm max-sm:tracking-tight">
                        Stay informed with our blog section dedicated to future technology.
                    </p>
                </div>
            </header>
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


function FeatureCard({ title, description }) {
    return (
        <article className="flex flex-col flex-1 gap-5 items-start p-10 rounded-xl border bg-zinc-900 border-neutral-800 max-md:p-8 max-sm:p-5">
            <h3 className="w-full text-2xl font-medium tracking-tighter leading-9 text-white max-md:text-xl max-md:tracking-tight max-sm:text-lg max-sm:tracking-tight">
                {title}
            </h3>
            <p className="w-full text-lg tracking-tight leading-7 text-neutral-400 max-md:text-base max-md:tracking-tight max-sm:text-sm max-sm:tracking-tight">
                {description}
            </p>
        </article>
    );
}

function TechBlogIcon() {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: `<svg id="226:11875" layer-name="Icon" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[80px] h-[80px] max-lg:w-[60px] max-lg:h-[60px] max-sm:w-[50px] max-sm:h-[50px]">
          <path d="M54 54C64.6731 51.4308 72 46.1265 72 40C72 33.8735 64.6731 28.5692 54 26C55.098 30.2126 55.716 34.9676 55.716 40C55.716 45.0324 55.098 49.7874 54 54Z" fill="#404040"></path>
          <path d="M26 54C15.3269 51.4308 8 46.1265 8 40C8 33.8735 15.3269 28.5692 26 26C24.902 30.2126 24.284 34.9676 24.284 40C24.284 45.0324 24.902 49.7874 26 54Z" fill="#404040"></path>
          <path d="M26 54C28.5692 64.6731 33.8735 72 40 72C46.1265 72 51.4308 64.6731 54 54C49.7874 55.098 45.0324 55.716 40 55.716C34.9676 55.716 30.2126 55.098 26 54Z" fill="#FFD11A"></path>
          <path d="M26 26C28.5692 15.3269 33.8735 8 40 8C46.1265 8 51.4308 15.3269 54 26C49.7874 24.902 45.0324 24.284 40 24.284C34.9676 24.284 30.2126 24.902 26 26Z" fill="#FFD11A"></path>
        </svg>`,
            }}
        />
    );
}

export default FutureTechnologyBlog;
