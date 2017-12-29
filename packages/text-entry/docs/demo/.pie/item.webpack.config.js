 
  //auto generated on: Fri Dec 29 2017 16:43:31 GMT-0500 (EST)
  
  module.exports = {
  "module": {
    "rules": [
      {
        "test": /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/,
        "use": [
          {
            "loader": "url-loader",
            "options": {
              "limit": 10000
            }
          }
        ]
      },
      {
        "test": /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "modules": false
            }
          }
        ]
      },
      {
        "test": /\.less$/,
        "use": [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        "test": /\.(jsx)?$/,
        "use": [
          {
            "loader": "babel-loader",
            "options": {
              "babelrc": false,
              "presets": [
                "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules/babel-preset-react/lib/index.js",
                "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules/babel-preset-env/lib/index.js",
                "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules/babel-preset-stage-0/lib/index.js"
              ]
            }
          }
        ]
      }
    ]
  },
  "resolveLoader": {
    "modules": [
      "/Users/edeustace/dev/github/PieElements/pie-elements/packages/text-entry/docs/demo/.pie/node_modules",
      "node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules/pie-support-less/node_modules"
    ]
  },
  "context": "/Users/edeustace/dev/github/PieElements/pie-elements/packages/text-entry/docs/demo/.pie",
  "entry": "./item.entry.js",
  "output": {
    "filename": "item.bundle.js",
    "path": "/Users/edeustace/dev/github/PieElements/pie-elements/packages/text-entry/docs/demo"
  },
  "resolve": {
    "extensions": [
      ".js",
      ".jsx"
    ],
    "modules": [
      "/Users/edeustace/dev/github/PieElements/pie-elements/packages/text-entry/docs/demo/.pie/.configure/node_modules",
      "/Users/edeustace/dev/github/PieElements/pie-elements/packages/text-entry/docs/demo/.pie/.controllers/node_modules",
      "/Users/edeustace/dev/github/PieElements/pie-elements/packages/text-entry/docs/demo/.pie/node_modules",
      "node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules/pie-support-less/node_modules"
    ]
  },
  "devtool": "eval"
};
  