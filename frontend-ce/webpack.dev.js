const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const taskUtils = require('./utils/task')();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = merge(common, {
  mode: 'development',
  devServer: {
    hot: true
  },
  plugins: [
/*     new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../webpack-analizer/report.html'
    }), */
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(taskUtils.iterObj(require('./config/config.dev.json'))),    
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false,
      chunksSortMode: 'none'
    })    
  ]
})