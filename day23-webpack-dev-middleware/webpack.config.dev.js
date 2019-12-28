const config = require("./webpack.config.server");

module.exports = {
    ...config,
    mode: "development",
    watch: true,
};