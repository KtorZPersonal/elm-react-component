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
        "react": "React",
    },
    output: {
        path: './dist',
        library: 'ElmReact',
        libraryTarget: 'var',
        filename: 'elm-react-browser.min.js',
    },
    plugin: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}
