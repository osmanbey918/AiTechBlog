"use client";
import FutureTechnologyBlog from "@/components/home/(futureTech)/FutureTechnologyBlog";
import BlogPostSection from "@/components/home/blogPost/BlogPostSection";
// import BlogSectionHeader from "@/components/home/blogPost/Header";
import ResearchInsightsSection from "@/components/home/(futureTech)/ResearchInsightsSection";
import ResourcesSection from "@/components/home/ResourcesSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import StatsSection from "@/components/home/StatsSection";
import FutureTechSection from "@/components/home/(futureTech)/FutureTechSection";
import ItemsContainer from "@/components/home/testimonial/Testimonial";
import ConnectSection from "@/components/footer/ConnectSection";
import MainNavBar from "@/components/navbar/MainNavBar";
import Navbar from "@/components/navbar/MainNavBar";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div>
    <Navbar/>
      <main className="flex relative flex-col flex-1 gap-24 items-start pt-36 g-px max-md:gap-16 max-md:pt-24 max-sm:gap-10 max-sm:pt-16 min-h-screen bg-black text-white">
        <header className="flex relative flex-col gap-8 items-start w-[60%] max-sm:gap-5">
          <p className="relative text-3xl tracking-tighter leading-9 text-stone-500 max-md:text-2xl max-sm:text-xl max-sm:tracking-tight">
            Your Journey to Tomorrow Begins Here
          </p>
          <div className="flex relative flex-col gap-5 items-start w-full">
            <h1 className="relative w-full text-7xl tracking-tighter text-white leading-[84px] max-md:text-5xl max-md:tracking-tighter max-sm:text-3xl max-sm:tracking-tighter">
              Explore the Frontiers of Artificial Intelligence
            </h1>
            <p className="relative w-full text-lg tracking-tight leading-7 text-zinc-500 max-md:text-base max-sm:text-sm max-sm:tracking-tight">
              Welcome to the epicenter of AI innovation. FutureTech AI News is your passport
              to a world where machines think, learn, and reshape the future. Join us on this
              visionary expedition into the heart of AI.
            </p>
          </div>
        </header>
      </main>

      <StatisticsSection />
      <StatsSection />
      <FutureTechSection />
      <BlogPostSection />
      <ItemsContainer />
      <ConnectSection />
      
    </div>
  );
}

