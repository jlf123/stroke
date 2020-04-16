const WebpackHtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { join } = require('path');

module.exports = {
    entry: join(__dirname, '../splash-screen/index.jsx'),
    output: {
        path: join(__dirname, '../build/splash-screen'),
        filename: 'splash-screen.js',
    },
    plugins: [
        new WebpackHtmlPlugin({
            title: 'Stroke SplashScreen',
            template: join(__dirname, '../splash-screen/index.html'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: './',
                            name: '[hash].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                ],
            },
        ],
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 1000,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        contentBase: join(__dirname, '../build/splash-screen'),
        compress: true,
        port: 8080
    }
};
