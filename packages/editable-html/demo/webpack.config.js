const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  devtool: 'cheap-eval-source-map',
  context: __dirname,
  entry: './new-entry.jsx',
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
            'react', 'es2015'
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new DashboardPlugin()
  ]
}