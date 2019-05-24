const common = require('./webpack.common.js'),
      merge = require('webpack-merge'),
      path = require('path'),
      taskUtils = require('./utils/task')(),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        hot: true,
        publicPath: '/',
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(taskUtils.iterObj(require('./config/config.dev.json'))), 
        new HtmlWebpackPlugin({ 
            template: path.resolve(__dirname, 'src', 'app', 'index.html'),
            baseUrl: '/'
        })
    ]
});