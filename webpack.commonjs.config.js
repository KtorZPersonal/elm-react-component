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
        "react": true,
        "react-dom": true
    },
    output: {
        path: './dist',
        library: 'ElmReact',
        libraryTarget: 'commonjs2',
        filename: 'elm-react-commonjs.js',
    },
    plugin: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}
