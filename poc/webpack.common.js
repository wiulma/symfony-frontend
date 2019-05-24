const path = require('path'),
      webpack = require('webpack'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        polyfill: ["@babel/polyfill"],
        app: ['./src/app/index.js'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    optimization: {
        runtimeChunk: 'single',        
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
      },    
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                "@babel/react",
                                ["@babel/preset-env", 
                                    { 
                                        modules: false,
                                        targets: {
                                            browsers: ['> 1% in IT']
                                        },
                                        useBuiltIns: 'entry',
                                        corejs: "3",
                                        debug: true
                                    }
                                ]
                            ],
                            "plugins": [
                                "react-hot-loader/babel",
                                "@babel/plugin-proposal-object-rest-spread",
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-syntax-dynamic-import"
                            ]
                        }
                    }
                ]
                
            },
            {
                test: /\.(scss)$/,
                use: [{
                  loader: 'style-loader', // inject CSS to page
                }, {
                  loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                  loader: 'postcss-loader', // Run post css actions
                  options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                      return [
                        require('precss'),
                        require('autoprefixer')
                      ];
                    }
                  }
                }, {
                  loader: 'sass-loader' // compiles Sass to CSS
                }]
            },       
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            'Popper': 'popper.js/dist/umd/popper'
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/static', 
                to: 'static',
                force: true
            }
        ], {debug: 'debug'})
    ]
}