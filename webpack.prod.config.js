const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseWebpackConfig = require("./webpack.config.js");

module.exports = {
    ...baseWebpackConfig,
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./build"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve("/index.html")
        })
    ]
};
