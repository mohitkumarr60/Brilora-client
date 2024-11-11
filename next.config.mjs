/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    reactRoot: true,
    supressHydrationWarning: true,
  },
};

export default nextConfig;
