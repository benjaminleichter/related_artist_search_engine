const path = require('path');

module.exports = {
    entry: "./static/js/index.jsx",
    output: {
        path: __dirname + '/static/js/gen/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader",
                exclude: '/node_modules/'
            }
        ],
    },
    resolve: {
        alias: {
            'static': path.resolve('./static'),
        },
        extensions: [".js", ".jsx"]
    },
};