var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        tabs: './demo/tabs/index.js',
        carousel: './demo/carousel/index.js'
    },
    output: {
        path: path.join(__dirname, '/demo/'),
        filename: '[name]/js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css-loader?importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer-loader?{browsers:["last 2 version", "ie 9"]}')
            },
        ]
    },
    plugins:[
        new ExtractTextPlugin('[name]/css/[name].css', {
            allChunks: true
        })
    ]
}