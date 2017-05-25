// http://sharp.dimens.io/en/stable/performance/#results
// Faster npm image processing
var sharp = require('sharp');

var loaderUtils = require('loader-utils');
var lqipName = require('./package.json').name;
var packageversion = require('./package.json').version;

// supported images \ mimetypes
// best results have been seen on JPEG banners
var SUPPORTED_MIMES = {
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'png': 'image/png'
};

// extension: file extension
// data: image file Buffer after resize
var toBase64 = function (extension, data) {
  return 'data:' + SUPPORTED_MIMES[extension] + ';base64,' + data.toString('base64');
};
module.exports = function() { }
module.exports.pitch = function(content) {
  this.cacheable && this.cacheable();
  var callback = this.async();

  // image file path
  var path = this.resourcePath;
  // image file extension
  var extension = path.split('.').pop().toLowerCase();

  // the source HQ image file
  var source = null;
  // the low quality placeholder
  var presource = null;

  // user options
  var baseConfig = loaderUtils.getOptions(this) || { };
  // default options
  var config = {
    path: '',
    name: '[name].[ext]'
  };
  // take the user's specified options as a preference
  Object.keys(config).forEach(function(key) {
    config[key] = baseConfig[key];
  });
  // loader context
  var context = config.context || this.options.context;

  // use loaderUtils to construct a proper name
  // config.name eg. ([name].[ext]: car.jpg) or ([hash].[ext]: [96redfghjk.....].[jpg]) 
  source = loaderUtils.interpolateName(this, config.path + '/' + config.name, {
		context: context,
		content: content
	}) || "/";
  
  // output object
  var output = {};

  if (typeof SUPPORTED_MIMES[extension] === 'undefined') {
    throw new Error('Unsupported image format passed to ' + packageName + ' v. ' + packageversion);
  }

  sharp(path)
    .resize(16) // resize to 16px width and auto height
    .toBuffer() // converts to buffer for Base64 conversion
    .then(data => {
      presource = toBase64(extension, data);
      output.src = source;
      output.preSrc = presource;
      callback(null, 'module.exports = ' + JSON.stringify(output) + ';');
    })
    .catch(err => {
      callback(err, null);
    });
};
