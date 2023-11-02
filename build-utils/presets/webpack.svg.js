module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          '@svgr/webpack',
          'url-loader?limit=10000&mimetype=image/svg+xml',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // This will inline images smaller than 10kb as data URIs
              name: '[name].[ext]', // This ensures the original file name is used
            },
          },
        ],
      },
    ],
  },
});
