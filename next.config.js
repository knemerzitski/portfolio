const withExportImages = require('next-export-optimize-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 768, 1080, 1280, 1536, 1920, 3840],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    // Remove svg from image loader since it conflicts with 'next-export-optimize-images' when using '@svgr/webpack'
    const nextExportImageLoader = config.module.rules.find(({ use }) =>
      use && use.length > 0 && use[0].loader === 'next-export-optimize-images-loader');
    if (nextExportImageLoader) {
      nextExportImageLoader.test = /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$/i; // Removed svg
    }

    return config;
  },
}

module.exports = withExportImages(nextConfig);
