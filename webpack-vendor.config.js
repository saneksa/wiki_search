var webpack = require('webpack');

module.exports = {
    entry: ['./vendor/vendor.js'],
    output: {
        filename: 'vendor.bundle.js',
        path: 'vendor',
        library: 'vendor',
        libraryTarget: 'var'
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'vendor',
            path: 'vendor/vendor.manifest.json',
        })
    ]
};