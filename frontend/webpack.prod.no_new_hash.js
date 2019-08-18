const path = require('path');
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },  
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', 
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
    new ExtractTextPlugin(
        {filename: '[name].[chunkhash].css', disable: false, allChunks: true}
      ),
    new HtmlWebpackPlugin({
      template: 'src/index-prod.tmpl',
      filename: 'index.html',
      inject: false,
      hash: true,
      showErrors: true
    })
  ]  
})