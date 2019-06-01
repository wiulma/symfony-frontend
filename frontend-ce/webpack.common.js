const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack');
const glob = require('glob');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    polyfill: '@babel/polyfill',
    app: './src/app.js',
    /*lib: glob.sync(path.resolve(__dirname, './lib/*.js'))*/
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                enforce: true,
                chunks: 'all'
            },
            commons: {
              name: 'commons',
              chunks: 'initial',
              minChunks: 2
            }
        }
    }
  },
  module: {
    rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: true,
              collapseWhitespace: true,
            }
          }
        },      
        {
          test: /\.js$/,
          exclude: /(node_modules|vendors|lib)/,
          use: {
            loader: 'babel-loader',
          }
        }   
    ]  
  },
  plugins: [    
    new CopyPlugin([
      {
        from: 'src/assets',
        to: 'assets',
        ignore: ['*.js'],
      }
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      Waves: 'node-waves',
      _: 'underscore',
      Promise: 'es6-promise',
    }),

    new CleanWebpackPlugin(['dist'], { verbose: true })
  ]  
}
