var configGenerator = require('./webpack.config.generator.js');
var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
var ShellScript = require('./plugins/ShellScript/index.js');
var path = require('path');
var os = require('os');

var siteRootDir = path.join(__dirname, 'site-test');

let outputScriptName = 'app.js';
let config = configGenerator({
    enableDllUsage: false,
    enableHotModuleReload: false,
    includeStyleLoader: false,
    envTargets: {node: 'current'},
    entry: path.join(__dirname, 'test/index.js'),
    siteRootDir: siteRootDir,
    output: {filename: outputScriptName},
    target: 'node',
    externals: [nodeExternals()],
    node: {
        fs: 'empty'
    },
    plugins: [
        new ShellScript({
            onBuildExit: path.join(__dirname, `node_modules/.bin/mocha${os.platform() === 'win32' ? '.cmd' : ''}`) +
                " --timeout 5000 --require " + path.join(__dirname, "jsdom_setup.js") + " " +
                path.join(siteRootDir, '_build', outputScriptName)
        })
    ],
    defines: {
        TEST: true
    }
});
module.exports = config;