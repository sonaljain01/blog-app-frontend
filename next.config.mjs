/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "laravel_blog_post.test",
      },
      {
        protocol:"https",
        hostname:"cdn-icons-png.flaticon.com"
      }
    ],
  },
};

export default nextConfig;
