const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
    filename: 'js/[name].[chunkhash].js',
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
              name: '[name].[ext]',
              outputPath:'assets'
            }
          },
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
          'sass-loader',
        ]
      },        
      {
        test: /\.(png|svg|jpg|gif|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: '[name].[ext]', outputPath:'assets'}
          }
        ]
      },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2', name: '[name].[ext]', outputPath:'assets' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff', name: '[name].[ext]', outputPath:'assets' } },
      { test: /\.(ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader', options: {name: '[name].[ext]', outputPath:'assets'} } 
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
    new MiniCssExtractPlugin({
      filename: `assets/[name].css`
    }),
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
