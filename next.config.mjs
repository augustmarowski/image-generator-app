/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '1z2drswgljicswa6.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};
 
export default nextConfig;
