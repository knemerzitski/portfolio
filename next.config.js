const withExportImages = require('next-export-optimize-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack(config, { isServer, nextRuntime, webpack }) {
    if (isServer && nextRuntime === 'nodejs') {
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
      );
    }

    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    // Remove svg from image loader since it conflicts with 'next-export-optimize-images' when using '@svgr/webpack'
    const nextExportImageLoader = config.module.rules.find(({ use }) => {
      return (
        Array.isArray(use) &&
        use.length > 0 &&
        use[0].loader === 'next-export-optimize-images-loader'
      );
    });
    if (nextExportImageLoader) {
      nextExportImageLoader.test = /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$/i; // Removed svg
    }

    return config;
  },
}

if (process.env.OUTPUT === 'export') {
  nextConfig.output = 'export';
} else {
}

module.exports = withExportImages(nextConfig);
