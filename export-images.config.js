/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  sharpOptions: {
    'webp': {
      quality: 95,
    },
    'jpg': {
      quality: 75,
    }
  },
  generateFormats: [
    'jpg',
  ]
};

module.exports = config