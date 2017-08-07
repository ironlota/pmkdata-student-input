const webpack = require('webpack');

var debug = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',
  devtool: debug ? 'inline-sourcemap' : 'source-map',

  output: {
    path: __dirname,
    filename: 'build/js/main.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },

  plugins: debug ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ],

  stats: {
    // Colored output
    colors: true
  }
};
