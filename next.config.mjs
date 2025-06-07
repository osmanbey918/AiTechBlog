/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  basePath: 'https://osmanbey918.github.io/AiTechBlog', 
};

module.exports = nextConfig;
