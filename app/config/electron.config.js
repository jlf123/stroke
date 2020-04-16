const { join } = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['@babel/polyfill', join(__dirname, '../renderer.jsx')],
    target: 'electron-renderer',
    output: {
        path: join(__dirname, '../build'),
        filename: 'renderer.js',
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
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
                            publicPath: './build/',
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
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader', // compiles Sass to CSS, using Node Sass by default
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
};