// const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  devtool: 'cheap-eval-source-map',
  context: __dirname,
  entry: './ce-issue.jsx',
  output: {
    filename: 'ce-issue.bundle.js',
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
            'react', 'es2015', 'stage-0'

          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    // new DashboardPlugin()
  ]
}