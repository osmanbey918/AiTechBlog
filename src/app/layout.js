import "./globals.css";
import Navbar from "@/components/navbar/MainNavBar";
import ConnectSection from "@/components/footer/ConnectSection";
import Footer from "@/components/footer/Footer";


export const metadata = {
  title: 'Techolyze',
  description: "Explore the latest AI insights, curated blogs, and trending topics.",
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body      >
        <Navbar />
        {children}
        <ConnectSection />
        <Footer />
      </body>
    </html>
  );
}
