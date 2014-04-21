var path = require('path');
var pkg = require(path.join(process.cwd(), 'package.json'))
exports.package = pkg;

// {{ settings for nico
exports.theme = __dirname
exports.source = process.cwd()
exports.output = path.join(process.cwd(), '_site')
exports.permalink = '{{directory}}/{{filename}}.html'
if (pkg.family === 'pandora') {
  exports.google = 'UA-50206223-1'
}
exports.ignorefilter = function(filepath, subdir) {
  if (/^(_site|_theme|node_modules|\.idea)/.test(subdir)) {
    return false;
  }
  return true;
}
exports.writers = [
  'nico.PageWriter',
  'nico.StaticWriter',
  'nico.FileWriter',
  'nico.MochaWriter'
]
// end settings }}

// extends for theme usage, that can be accessable by {{config.xxx}}
exports.assets_host = 'http://ue.17173cdn.com/a/lib';

exports.filters = {}

exports.isCssModule = (function() {
 // 名称若恰好为 stylib
  if (pkg.family === 'alice' || pkg.name === 'stylib') {
    return true
  }
  // output 中全是样式才用 alice
  var output = pkg.spm.output
  if (output) {
    for (var i in output) {
      var f = output[i]
      if (!/\.(css|stylus|less)$/.test(f)) return false
    }
  } else {
    return true
  }
  return true
})()
