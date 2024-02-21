const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

module.exports = {
  entry: {
    index: PATHS.src + '/js/index.js',
  },
  output: {
    path: PATHS.dist,
  },
  /*
  optimization: {
    minimize: false
  },
  */
  devServer: {
    port: 4000,
    watchFiles: ['src/**/*.html'],
    liveReload: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'error',
      template: './src/views/index.html',
      filename: 'index.html',
      chunks: ['index'],
      minify: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        // {
        //   from: PATHS.src + '/images/',
        //   to: 'images',
        // },
        {
          from: PATHS.src + '/js/',
          to: 'js',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sass|less|css)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'img/[name].[ext]' },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};