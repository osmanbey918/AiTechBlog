import ConnectSection from "@/components/footer/ConnectSection";
import BlogNav from "@/components/home/blogPost/BlogNav";
import BlogPostCard from "@/components/home/blogPost/BlogPostCard";
import NewsHead from "@/components/news/NewsHead";
import NewsHero from "@/components/news/NewsHero";
import NewsSection from "@/components/news/NewsSection";
import VideoSection from "@/components/news/VideoSection";
import SectionHeader from "@/components/sectionHeader/SectionHeader";

export default function News() {
    return (
        <>
            <NewsHero />
            <NewsSection />
            <SectionHeader badge={"Welcome to Our News Hub"} heading={"Discover the World of Headlines"} buttonText={"View All News"} />
            <BlogNav />
            <div className="p-6 bg-black min-h-screen text-white">
                {blogData.map((data, i) => (
                    <BlogPostCard key={i} {...data} />
                ))}
            </div>
            <SectionHeader badge={"Featured Videos"} heading={"Visual Insights for the Modern Viewer"} buttonText={"View All"} />
            <VideoSection />

        </>
    );
}
const blogData = [
    {
        authorImage: "https://randomuser.me/api/portraits/men/1.jpg",
        authorName: "Alice Quantum",
        authorSpecialty: "Quantum Physics",
        date: "May 31, 2025",
        title: "Quantum Supremacy Achieved",
        description: "Google claims to reach quantum supremacy with Sycamore processor.",
        likes: "15k",
        comments: "40",
        shares: "10",
    },
    {
        authorImage: "https://randomuser.me/api/portraits/women/2.jpg",
        authorName: "Bob Techie",
        authorSpecialty: "AI & ML",
        date: "May 20, 2025",
        title: "AI in 2025: What’s Next?",
        description: "From GPT-5 to autonomous agents, AI is evolving rapidly this year.",
        likes: "28k",
        comments: "78",
        shares: "33",
    },
    {
        authorImage: "https://randomuser.me/api/portraits/men/3.jpg",
        authorName: "Clara Innovate",
        authorSpecialty: "Biotech",
        date: "May 15, 2025",
        title: "CRISPR Breakthroughs",
        description: "Editing the human genome safely is now closer than ever.",
        likes: "9.5k",
        comments: "20",
        shares: "12",
    },
];
