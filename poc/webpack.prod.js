const common = require('./webpack.common.js'),
      path = require('path'),
      merge = require('webpack-merge'),
      webpack = require('webpack'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
      UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
      taskUtils = require('./utils/task')(),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CompressionPlugin = require("compression-webpack-plugin"),
      CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
              "css-loader"
            ]
          }
        ]
    },
    stats: {
        colors: false,
        hash: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true,
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: {
                        inline: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    enforce: true,
                    chunks: 'all'
                }
            },            
            maxSize: 400000
        }
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, 'dist')], {verbose: true}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.DefinePlugin(taskUtils.iterObj(require('./config/config.prod.json'))),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0
        }),        
        new HtmlWebpackPlugin(
            { 
                template: path.resolve(__dirname, 'src', 'app', 'index.html'),
                baseUrl: '/front/'
                
            }
        )
    ]
});