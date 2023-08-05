module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          removeComments: false,
        },
      },
    },
    {
      name: 'removeComments',
      params: false,
    },
    'removeDimensions',
    'reusePaths',
    'prefixIds'
  ],
};