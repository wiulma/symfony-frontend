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
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: false,
        terserOptions: {
          output: {
            comments: false
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
    
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../webpack-analizer/report.html',
      openAnalyzer: false
    }),
    
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
      inject: 'body',
      hash: true,
      showErrors: true,
      chunksSortMode: 'none'
    }),
    new WebpackMd5Hash()
  ]
})
