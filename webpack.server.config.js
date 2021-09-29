//var path = require('path')
//var webpack = require('webpack')
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseWebpackConfig = require('./webpack.config.js');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(baseWebpackConfig, {
  target: 'node',
  entry: './src/app/entry-server.js',
  devtool: 'source-map',
output:{
  
  libraryTarget: 'commonjs2'},
externals:
  nodeExternals({
    allowlist: /\.css$/
  }),
  //cuando usas "app" se crean varios puntos de entrada como 0.js o 1.js
  /**
    entry:{
      app:'./src/app/entry-server.js'
    }
  
   */
  /**
   * 
   * ojo esto se borro ultimo 
   *   devtool: false,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'built-server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: [
    //  Object.keys(require('./package.json').dependencies ),
    nodeExternals({
      allowlist: /\.css$/
    })
  ],
   * 
   */


  //     externals: nodeExternals({ 
  //    esta terminologia ya no se usa por ser racista al igual que otras 
  //   whitelist: /\.css$/ 
  //    }), 
  //¿Para que sirve la minimizacion o optimizacion  ?
  plugins: [
      new VueSSRServerPlugin()
       /**   new webpack.DefinePlugin({
         'process.env': 'production'
       }),
       */
  ],

  /**
   * OJO ESTO SE BORRO ULTIMO
   *  optimization: {
    minimizer: [new UglifyJsPlugin()],
  } */
 
});