const webpack = require('webpack');
const config = require('./config');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = {
  _entry: {
    app: config.srcDir + '/app.js',
  },
  _output: {
    filename: 'scripts/[name].js',
    path: config.buildDir + '/assert/',
  },
  _module: {
    loaders: [{
      test: /\.jsx?$/,
      include: [
        path.resolve(config.srcDir)
      ],
      exclude: [
        path.resolve(__dirname, '../node_modules')
      ],
      loader: 'babel-loader',
      query: {
        presets: [["es2015", {"modules": false}], 'react', 'stage-3'],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.less$/,
      include: [
        path.resolve(config.srcDir),
      ],
      exclude: [
        path.resolve(__dirname, '../node_modules'),
      ],
      loaders: [
        'style-loader',
        ExtractTextPlugin.extract({ loader: 'css-loader?sourceMap', options: { importLoaders: 1 } }),
        'less-loader',
        'postcss-loader',
      ],
    }],
  },
  _devtool: 'source-map',
  _plugins: [
    new ExtractTextPlugin({ filename: 'styles/[name].css', disable: false, allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
    })
  ]
}

module.exports = baseConfig;
