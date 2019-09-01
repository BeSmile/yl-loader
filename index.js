var babel = require("@babel/core");
var loaderUtils = require("loader-utils");
var yaml = require("js-yaml")
var getOptions = loaderUtils.getOptions;

module.exports = function(source, map, meta) {
    this.cacheable && this.cacheable();
    const options = getOptions(this);
    const { safe = false, ...option } = options;
    var action = !safe ? 'load' : 'safeLoad';
    var res = null;
    var error = null;
    try {
        res = yaml[action](source, option);
    } catch (e) {
        res = null;
        error = new Error(e);
    }
    this.callback(error, `export default ${JSON.stringify(res)}`);
}

