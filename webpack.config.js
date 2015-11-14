var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, 'src');
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const TARGET = process.env.BABEL_ENV = process.env.npm_lifecycle_event;

var common = {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: APP_PATH + '/app.jsx',
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React Video Player'
        }),
        //new OpenBrowserWebpackPlugin({ url: 'http://localhost:8080/build'}),
    ],
    module: {
        loaders: [
            { test: /\.css$/, include: APP_PATH, loader: 'style!css'},
            { test: /\.jsx?$/, include: APP_PATH, loader: 'babel'}
        ]
    }
};

// provides default in the event that we're running Webpack outside of npm
if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}


