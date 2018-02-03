const execSync = require('child_process').execSync;
const fs = require('fs');

const defaultOptions = {
    onBuildExit: [],
    dev: true,
    verbose: false,
    safe: false
};

function ShellScript(options) {
    this.options = validateInput(mergeOptions(options, defaultOptions));
}

ShellScript.prototype.handleScript = function (script) {
    const scriptParams = serializeScript(script);
    try {
        execSync(scriptParams.command + ' ' + scriptParams.args.join(' '), {stdio: 'inherit'});
    } catch (e) {

    }
};

ShellScript.prototype.apply = function (compiler) {

    compiler.plugin('done', (compilation) => {
        if (this.options.onBuildExit.length) {
            console.log('Executing additional scripts before exit');
            for (let i = 0; i < this.options.onBuildExit.length; i++) {
                this.handleScript(this.options.onBuildExit[i]);
            }
        }
    });
};

var validateInput = function (options) {
    if (typeof options.onBuildExit === 'string') {
        options.onBuildExit = options.onBuildExit.split('&&');
    }
    return options;
};

var mergeOptions = function (options, defaults) {
    for (const key in defaults) {
        if (options.hasOwnProperty(key)) {
            defaults[key] = options[key];
        }
    }
    return defaults;
};

var serializeScript = function (script) {
    if (typeof script === 'string') {
        const [command, ...args] = script.split(' ');
        return {command, args};
    }
    const {command, args} = script;
    return {command, args};
};

module.exports = ShellScript;