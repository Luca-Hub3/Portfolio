/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
