var webpack = require('webpack')

module.exports = {
    entry: './src/index.jsx',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }]
    },
    resolve: { extensions: ['', '.js', 'jsx'] },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
    },
    output: {
        path: './dist',
        library: 'ElmReact',
        libraryTarget: 'var',
        filename: 'elm-react-browser.js',
    },
    plugin: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}
