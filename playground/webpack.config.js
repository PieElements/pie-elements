module.exports = {
  context: __dirname,
  entry: './entry.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            'babel-preset-react'
          ]
        }
      }
    ]
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  }
};