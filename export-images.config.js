/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  imageDir: '_next/static/chunks/images',
  sharpOptions: {
    'webp': {
      quality: 95,
    },
    'jpg': {
      quality: 75,
    }
  },
  generateExtraExtensions: [
    'jpg',
  ],
};

module.exports = config