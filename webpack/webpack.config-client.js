const { assetsPath, commonLoaders } = require('./common.config');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports =
{
  mode: 'development',
  name: 'client',
  context: path.join(__dirname, '..', 'src', 'app'),
  entry: [ './index.js' ],
  devServer: {
    contentBase: './build/static',
    port: 3000
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all'
    }
  },
  output:
  {
    path: assetsPath,
    filename: '[name].[contenthash:8].js',
    publicPath: '/',
    chunkFilename: '[name].[contenthash:8].chunk.js'
  },
  module:
  {
    rules: commonLoaders.concat([
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCSSExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '/'
            }
          }
        }
      ])
  },
  resolve:
  {
    extensions: [ '.jsx', '.js' ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'app', 'index.html'),
      filename: 'index.html'
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].chunk.css'
    })
  ]
};
