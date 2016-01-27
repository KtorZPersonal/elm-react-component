var webpack = require('webpack')

module.exports = {
    entry: './index.jsx',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }]
    },
    resolve: { extensions: ['', '.js', 'jsx'] },
    externals: {
        "react": true,
    },
    output: {
        path: './dist',
        library: 'ElmReact',
        libraryTarget: 'commonjs2',
        filename: 'elm-react-commonjs.min.js',
    },
    plugin: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}
