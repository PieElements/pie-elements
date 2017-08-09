module.exports = {
  context: __dirname,
  entry: './entry.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            require('babel-preset-react'), require('babel-preset-es2015')
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}