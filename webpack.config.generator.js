var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var argv = require('optimist').argv;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WatchIgnorePlugin = require('watch-ignore-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var _ = require('lodash');

module.exports = ({
    siteRootDir = path.join(__dirname, argv.root || 'site'),
    output = {},
    htmlPluginConfig = {
        title: 'Async',
        filename: path.join('..', 'index.html'),
        inject: false,
        hash: true,
        template: 'templates/index.pug'
    },
    extractTextPluginConfig = {filename: 'styles[hash].css'},
    includeStyleLoader = true,
    enableDllUsage = true,
    envTargets = {
        browsers: 'last 1 Chrome versions'
    },
    target = 'web',
    externals,
    node,
    plugins,
    entry = [
        'webpack-dev-server/client?http://0.0.0.0:4000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './src/index.js'
    ],
    defines = {}
} = {}) => {
    var buildDir = path.join(siteRootDir, '_build');

    var isDebug = !JSON.parse(process.env.PROD_ENV || '0');

    return {
        cache: true,
        devtool: 'source-map',
        devServer: {
            port: 4000,
            historyApiFallback: true
        },
        target,
        externals,
        node,
        entry,
        output: _.merge({
            path: buildDir,
            filename: 'app.bundle[hash].js'
        }, output),
        resolve: {
            extensions: ['.js'],
            modules: ['packages', 'node_modules']
        },
        resolveLoader: {
            modules: ["web_loaders", "web_modules", "node_loaders", "node_modules", ".."],
            extensions: [".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
            mainFiles: ["webpackLoader", "webLoader", "loader", "main", "index"]
        },
        plugins: _.compact([
            enableDllUsage && new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(path.join(__dirname, 'vendor', 'vendor.manifest.json')),
                sourceType: 'var'
            }),
            new webpack.ProvidePlugin({
                React: 'react',
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            }),
            new webpack.DefinePlugin(_.extend({
                DEBUG: isDebug,
                TEST: false
            }, defines)),
            htmlPluginConfig && new HtmlWebpackPlugin(htmlPluginConfig),
            htmlPluginConfig && new HtmlWebpackIncludeAssetsPlugin({
                assets: [
                    'vendor.js'
                ],
                append: false
            }),
            new WatchIgnorePlugin([buildDir]),
            new CopyWebpackPlugin([
                {from: 'vendor/vendor.bundle.js', to: 'vendor.js'}
            ]),
            extractTextPluginConfig && new ExtractTextPlugin(extractTextPluginConfig),
            new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en-gb|ru)$/)
        ].concat(plugins)),
        module: {
            rules: _.compact([
                {
                    test: /\.png$/,
                    exclude: /node_modules/,
                    use: 'file?name=i/[hash].[ext]'
                },
                {
                    test: /\.pug/,
                    use: "pug-loader"
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: _.compact([
                        includeStyleLoader ? 'style-loader' : null,
                        'css-loader'
                    ])
                },
                {
                    test: /\.(css|less)$/,
                    exclude: /node_modules/,
                    use: _.compact([
                        includeStyleLoader
                            ? 'style-loader'
                            : null,
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                globalVars: {debug: isDebug}
                            },
                        },
                    ])
                },
                {
                    test: /((^|\/)\w+?$|\.js$)/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                plugins: [
                                    'babel-plugin-transform-object-rest-spread',
                                    'babel-plugin-transform-react-jsx',
                                    'babel-plugin-transform-class-properties'
                                ],
                                presets: _.compact([
                                    ["env", {
                                        targets: envTargets,
                                        modules: false,
                                        loose: true
                                    }],
                                    'babel-preset-react'
                                ])
                            }
                        },
                        'eslint-loader'
                    ]
                }
            ])
        }
    }
};