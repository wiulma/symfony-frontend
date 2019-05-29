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
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            }    
          }            
        ]
      },
      {
        test: /\.css$/,
        use: [
          'to-string-loader',
          'css-loader',
          'resolve-url-loader'
        ]
      },        
      {
        test: /\.(png|svg|jpg|gif|eot)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
      { test: /\.(ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' }     
    ]
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
      inject: 'body',
      chunksSortMode: 'none'
    })    
  ]
})