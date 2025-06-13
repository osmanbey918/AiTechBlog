"use client";
import BlogPostCard from '@/components/home/blogPost/BlogPostCard';
import { NewsCard } from '@/components/news/NewsSection';
import SectionHeader from '@/components/sectionHeader/SectionHeader';
import { useEffect, useState } from 'react';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function loadBlogs() {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    }
    loadBlogs();
  }, []);

  return (
    <div>
            <SectionHeader badge={"A Knowledge Treasure Trove"} heading={"Explore FutureTech's In-Depth Blog Posts"}/>
      
      <ul>
        {blogs.map((blog, index) => (
         
            <BlogPostCard key={index}  authorName={blog.author} title={blog.title} authorSpecialty={blog.categories} description={blog.description} date={blog.published} onViewBlog={blog.link}/>
       
        ))}
      </ul>
    </div>
  );
}
