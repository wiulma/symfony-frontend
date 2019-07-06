const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const taskUtils = require('./utils/task')();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname),
    watchContentBase: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions']
                }),
              ]
            }
          },
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
