 
  //auto generated on: Tue Feb 20 2018 20:10:03 GMT+0530 (IST)
  
  module.exports = {
  "module": {
    "rules": [
      {
        "test": /.*highlight\.js.*default\.css$/,
        "use": [
          "raw-loader"
        ]
      },
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
        ],
        "exclude": [
          /.*highlight\.js.*/
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
                "/Users/primoko-ws-mbp-002/.nvm/versions/node/v7.10.0/lib/node_modules/pie/node_modules/babel-preset-react/lib/index.js",
                "/Users/primoko-ws-mbp-002/.nvm/versions/node/v7.10.0/lib/node_modules/pie/node_modules/babel-preset-env/lib/index.js",
                "/Users/primoko-ws-mbp-002/.nvm/versions/node/v7.10.0/lib/node_modules/pie/node_modules/babel-preset-stage-0/lib/index.js"
              ]
            }
          }
        ]
      }
    ]
  },
  "resolveLoader": {
    "modules": [
      "/Users/primoko-ws-mbp-002/Documents/primoko/pie-elements/packages/extended-text-entry/docs/demo/.pie/node_modules",
      "node_modules",
      "/Users/primoko-ws-mbp-002/.nvm/versions/node/v7.10.0/lib/node_modules/pie/node_modules",
      "/Users/primoko-ws-mbp-002/.nvm/versions/node/v7.10.0/lib/node_modules/pie/node_modules/pie-support-less/node_modules"
    ]
  },
  "context": "/Users/primoko-ws-mbp-002/Documents/primoko/pie-elements/packages/extended-text-entry/docs/demo/.pie",
  "entry": "./info.entry.js",
  "output": {
    "filename": "info.bundle.js",
    "path": "/Users/primoko-ws-mbp-002/Documents/primoko/pie-elements/packages/extended-text-entry/docs/demo/.pie"
  },
  "resolve": {
    "extensions": [
      ".js",
      ".jsx"
    ],
    "modules": [
      "/Users/primoko-ws-mbp-002/Documents/primoko/pie-elements/packages/extended-text-entry/docs/demo/.pie/.configure/node_modules",
      "/Users/primoko-ws-mbp-002/Documents/primoko/pie-elements/packages/extended-text-entry/docs/demo/.pie/.controllers/node_modules",
      "/Users/primoko-ws-mbp-002/Documents/primoko/pie-elements/packages/extended-text-entry/docs/demo/.pie/node_modules",
      "node_modules",
      "/Users/primoko-ws-mbp-002/.nvm/versions/node/v7.10.0/lib/node_modules/pie/node_modules",
      "/Users/primoko-ws-mbp-002/.nvm/versions/node/v7.10.0/lib/node_modules/pie/node_modules/pie-support-less/node_modules"
    ]
  },
  "devtool": "eval"
};
  