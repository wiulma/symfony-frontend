const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const taskUtils = require('./utils/task')();
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            { 
              loader: 'sass-loader', 
              options: {
                includePaths: ['./node_modules']
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './lib/**/*',
        to: './',
        test: /\.(css|woff|woff2)$/
      }
    ]),
    new webpack.DefinePlugin(taskUtils.iterObj(require('./config/config.prod.json'))),
    new ExtractTextPlugin(
        {filename: '[name].[hash].css', disable: false, allChunks: true}
      ),
    new HtmlWebpackPlugin({
      template: 'src/index-prod.tmpl',
      filename: 'index.html',
      inject: false,
      hash: true,
      showErrors: true,
      chunksSortMode: 'none'
    }),
    new WebpackMd5Hash()
  ]
})
