// webpack.config.js

module.exports = {
    // other webpack configurations
    module: {
      rules: [
        // other rules...
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        },
      ],
    },
  };
  