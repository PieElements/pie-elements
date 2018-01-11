 
  //auto generated on: Thu Jan 11 2018 21:56:37 GMT+0530 (IST)
  
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
                "/usr/local/lib/node_modules/pie/node_modules/babel-preset-react/lib/index.js",
                "/usr/local/lib/node_modules/pie/node_modules/babel-preset-env/lib/index.js",
                "/usr/local/lib/node_modules/pie/node_modules/babel-preset-stage-0/lib/index.js"
              ]
            }
          }
        ]
      }
    ]
  },
  "resolveLoader": {
    "modules": [
      "/Users/primoko-ws-mbp-002/Documents/primoko/custom-elements/pie-inline-choice/docs/demo/.pie/node_modules",
      "node_modules",
      "/usr/local/lib/node_modules/pie/node_modules",
      "/usr/local/lib/node_modules/pie/node_modules/pie-support-less/node_modules"
    ]
  },
  "context": "/Users/primoko-ws-mbp-002/Documents/primoko/custom-elements/pie-inline-choice/docs/demo/.pie",
  "entry": "./item.entry.js",
  "output": {
    "filename": "item.bundle.js",
    "path": "/Users/primoko-ws-mbp-002/Documents/primoko/custom-elements/pie-inline-choice/docs/demo"
  },
  "resolve": {
    "extensions": [
      ".js",
      ".jsx"
    ],
    "modules": [
      "/Users/primoko-ws-mbp-002/Documents/primoko/custom-elements/pie-inline-choice/docs/demo/.pie/.configure/node_modules",
      "/Users/primoko-ws-mbp-002/Documents/primoko/custom-elements/pie-inline-choice/docs/demo/.pie/.controllers/node_modules",
      "/Users/primoko-ws-mbp-002/Documents/primoko/custom-elements/pie-inline-choice/docs/demo/.pie/node_modules",
      "node_modules",
      "/usr/local/lib/node_modules/pie/node_modules",
      "/usr/local/lib/node_modules/pie/node_modules/pie-support-less/node_modules"
    ]
  },
  "devtool": "eval"
};
  