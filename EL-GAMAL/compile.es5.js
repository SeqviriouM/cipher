'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

// import filesize from 'filesize';

var _makeWebpackConfigJs = require('./make-webpack-config.js');

var _makeWebpackConfigJs2 = _interopRequireDefault(_makeWebpackConfigJs);

var config = (0, _makeWebpackConfigJs2['default'])({
  optimize: true
});
var compiler = (0, _webpack2['default'])(config);

compiler.run(function Compile(err, stats) {
  console.log('Complited in ' + (stats.endTime - stats.startTime) / 1000);

  var errors = stats.compilation.errors;
  if (errors && errors.length) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var error = _step.value;

        console.log(error);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else {
    // const opts = stats.compilation.outputOptions;
    // const resultSize = fs.statSync(path.join(opts.path, opts.filename)).size;
    // console.log(filesize(resultSize));
  }
});

