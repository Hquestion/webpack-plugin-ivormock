const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const IvormockPlugin = require("../index");

module.exports = {
    mode: "development",
    entry: {
        app: "./index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        port: 6999,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html")
        }),
        new IvormockPlugin({
            port: 6000,
            mockPath: "mock",
            prefix: "/mock"
        })
    ],
    stats: "errors-only"
}