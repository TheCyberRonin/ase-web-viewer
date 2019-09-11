const { assetsPath, commonLoaders } = require('./common.config');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports =
{
  mode: 'production',
  name: 'client',
  context: path.join(__dirname, '..', 'src', 'app'),
  entry: [ './index.js' ],
  output:
  {
    path: path.join(__dirname, '..', 'docs'),
    filename: '[name].[contenthash:8].js',
    publicPath: '',
    chunkFilename: '[name].[contenthash:8].chunk.js'
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
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
      ]
    )
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
