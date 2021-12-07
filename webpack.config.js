const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    entry: path.resolve(appDirectory, "src/app.ts"),
    output: {
        //name for the js file that is created/compiled in memory
        filename: 'js/Bundle.js',
        pathinfo: false
    },
    resolve: {
         extensions: [".ts", ".js"]
        //extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        host: '0.0.0.0',
        port: 80,
        disableHostCheck: true,
        contentBase: path.resolve(appDirectory, "./"), //tells webpack to serve from the public folder
        publicPath: '/',
        hot: true
    },
    module: {
        rules: [
            // {test: /\.tsx?$/,
            // loader: "ts-loader"}
            {
              test: /\.tsx?$/,
              //use: "ts-loader",
              use: [
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true,
                  },
                },
              ],
              exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(appDirectory, "index.html")
        }),
        new CleanWebpackPlugin()
    ],
    mode: "development",
    optimization: {
        runtimeChunk: true,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false
    }
};