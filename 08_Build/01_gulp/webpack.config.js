module.exports = {
  entry: './blocks/products/products.js',
  output: {
    path: './bin/js/',
    filename: 'app.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['env']
      }
    }]
  },
  plugins: []
};
