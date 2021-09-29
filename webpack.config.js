var webpack = require('webpack');
var path = require('path');
require("@babel/polyfill")
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    entry: ["@babel/polyfill",'./src/app/entry-client.js'],
    output: {
        path: path.resolve(__dirname, './src/public/js'),
        filename: 'bundle.js',
        publicPath: './dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // Here you should change 'env' to '@babel/preset-env'
                        presets: ['@babel/preset-env'],
                    },
                }
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },

            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            },

        ]
    },
    resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
         
        },
        extensions :["*",".js",".vue",".json"]
      }
    , plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}
/*
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}*/