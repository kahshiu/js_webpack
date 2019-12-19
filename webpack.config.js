const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js"
  }
  ,output: {
    path: path.resolve(__dirname,"dist")
    ,filename: "my-project-bundled.js"
  }
  ,devServer: {
    port: 9000
    ,hot: true
  }
  ,module: {
    rules: [
      {
        test: /\.(js|jsx)$/
        ,exclude: /node_module/
        ,use: {
          loader: "babel-loader"
        }
      }
    ]
  }
  ,resolve: {
    symlinks: true
    ,alias: {
      src: path.resolve(__dirname, 'src/')
      ,utils: path.resolve(__dirname, 'src/utils/')
      ,myComponents: path.resolve(__dirname, 'src/myComponents/')
      ,myStore: path.resolve(__dirname, 'src/myStore/')
    }
  }
  ,plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html"
      ,filename: "./index.html"
    })

  ]
}
