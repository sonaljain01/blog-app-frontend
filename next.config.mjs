/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "laravel_blog_post.test",
        // hostname: "206.1.58.168",
      },
      {
        protocol:"https",
        hostname:"cdn-icons-png.flaticon.com"
      }
    ],
  },
};

export default nextConfig;
