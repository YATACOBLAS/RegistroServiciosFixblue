// webpack.client.config.js
//const webpack = require('webpack');
var path = require('path');
require("@babel/polyfill")
const{ merge} = require('webpack-merge');
const baseConfig = require('./webpack.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
    entry: ["@babel/polyfill",'./src/app/entry-client.js'],
    output: {
        path: path.resolve(__dirname, './src/public/js'),
        filename: 'bundle.js',
        publicPath: './dist/'
    },
    plugins: [   
        new VueSSRClientPlugin() 
    ] 
});