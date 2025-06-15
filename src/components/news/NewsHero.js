import React from "react";

const NewsHero = () => {
    return (
        <section className="bg-[#101010] flex items-center py-20">
            <div className="w-full flex flex-col md:flex-row gap-12">
                <header className="flex-1 g-px">
                    <h1 className="text-white text-[4rem] max-lg:text-[2.4rem] leading-[1.4] max-md:text-[1.8rem]">
                        Today&apos;s Headlines: Stay <br />
                        <div className="flex py-8 max-sm:flex-col max-md:py-0">

                            <p className="text-[3.4rem] max-md:text-[1.7rem] max-lg:text-[2.2rem]">Informed </p>
                            <p className="text-[#98989A] text-lg leading-7 py-2  pl-16 max-md:pl-6 max-sm:pl-0 max-sm:py-4 max-md:text-base">
                                Explore the latest news from around the world. We bring you up-to-the-minute updates on the most significant events, trends, and stories. Discover the world through our news coverage.
                            </p>
                        </div>
                    </h1>
                </header>

            </div>
        </section>
    );
};

export default NewsHero;
