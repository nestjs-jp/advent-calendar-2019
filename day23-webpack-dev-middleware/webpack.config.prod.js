const config = require("./webpack.config.server");

module.exports = {
    ...config,
    mode: "production",
    optimization: {
        minimize: false,
    },
};