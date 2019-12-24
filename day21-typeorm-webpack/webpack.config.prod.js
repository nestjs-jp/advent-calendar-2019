const config = require("./webpack.config.common");

module.exports = {
    ...config,
    mode: "production",
    optimization: {
        minimize: false,
    },
};
