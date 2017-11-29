module.exports = {
    entry: './js/app.js',
    output: {
        path: './build',
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
};
// const webpack = require('webpack');
// const path = require('path');
// const NODE_ENV = process.env.NODE_ENV || 'development';
//
// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'public', 'build'),
//     publicPath: '/build/',
//     filename: 'bundle.js'
//   },
//   watch: NODE_ENV === 'development',
//   devtool: NODE_ENV === 'development' && 'eval-source-map',
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader!eslint-loader?{fix:true}'
//       }, {
//         test: /\.css$/,
//         exclude: /node_modules/,
//         loader: ['style-loader', 'css-loader']
//       }
//     ]
//   },
//   plugins: [new webpack.DefinePlugin({
//     'process.env': {
//       'NODE_ENV': JSON.stringify(NODE_ENV)
//     }
//   })]
// };
