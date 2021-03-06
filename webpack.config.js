const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    devtool: "source-map",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/env",
                        {
                            plugins: ["@babel/plugin-proposal-class-properties"]
                        }
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(gif|png)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: ["*", ".js", ".jsx"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        port: 3000,
        publicPath: "/dist/",
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html")
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    }
};
