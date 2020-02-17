/*
 * @Description: webpack配置
 * @Autor: Sinpo
 * @Date: 2020-02-16 17:43:42
 * @LastEditors  : Sinpo
 * @LastEditTime : 2020-02-16 17:51:00
 */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
    entry: {
        main: './app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}

module.exports = config;