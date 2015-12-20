var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, 'src');
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const TARGET = process.env.BABEL_ENV = process.env.npm_lifecycle_event;

find();

function find() {
    console.log(__dirname);
}

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
            title: 'React Video Player',
            template: './src/index.html',
            inject: 'body'
        }),
        new OpenBrowserWebpackPlugin({ url: 'http://localhost:8080'}),
    ],
    module: {
        loaders: [
            { test: /\.css$/,
                include: APP_PATH,
                loader: 'style!css'
            },
            //{
            //    test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)$/,
            //    loader: 'url-loader?limit=8192'
            //},
            { test: /\.jsx$/,
                include: APP_PATH,
                loader: 'babel'
            },
            {
                test: /\.js$/,
                include: APP_PATH,
                loader: 'babel'
            }
        ]
    }
};

// provides default in the event that we're running Webpack outside of npm
if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new OpenBrowserWebpackPlugin(),
            //new ExtractTextPlugin('bundle.css')
        ]
    });
}


