const path = require('path');

module.exports = {
  publicPath: path.join(__dirname, '..','build', 'static'),
  assetsPath: path.join(__dirname, '..', 'build', 'static'),
  commonLoaders: [
    {
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader', options: {
          plugins: ['@babel/plugin-syntax-dynamic-import'],
          presets: ['@babel/react',['@babel/env', {useBuiltIns: 'usage', modules: false, targets: 'defaults'}]],
          cacheDirectory: true,
          cacheCompression: true,
          compact: true
        }
      },
      include: path.join(__dirname, '..', 'src', 'app'),
      exclude: path.join(__dirname, 'node_modules')
    }
  ],
};
