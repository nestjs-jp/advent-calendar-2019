const webpack = require("webpack");
const {
    join
} = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: ["webpack/hot/poll?100", "./src/main.ts"],
    target: "node",
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [
        nodeExternals({
            whitelist: ["webpack/hot/poll?100"],
        }),
    ],
    module: {
        rules: [{
            test: /.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/,
        }, ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": join(__dirname, "./")
        }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    output: {
        path: join(__dirname, "dist"),
        filename: "server.js",
    },
};