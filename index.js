var loaderUtils = require("loader-utils");
// lqip: https://github.com/zouhir/lqip
var lqip = require("lqip");

module.exports = function() {};

// @TODO: investigate pitching loader alternatives
// recommended to work in sequence with file-loader or url-loader

module.exports.pitch = function(content) {
  this.cacheable && this.cacheable();
  var callback = this.async();

  // image file path
  var path = this.resourcePath;
  // image file extension
  var extension = path
    .split(".")
    .pop()
    .toLowerCase();

  // user options
  var baseConfig = loaderUtils.getOptions(this) || {};

  // lqip-loader default options
  var config = {
    path: "",
    name: "[name].[ext]",
    base64: true, // default that users want base64
    palette: false // set to false for speed purposes
  };

  // take the user's specified options as a preference
  Object.keys(config).forEach(function(key) {
    config[key] = baseConfig[key] || config[key];
  });

  // loader context
  var context = config.context || this.options.context;

  // use loaderUtils to construct a proper name
  // config.name eg. ([name].[ext]: car.jpg) or ([hash].[ext]: [96redfghjk.....].[jpg])
  source =
    loaderUtils.interpolateName(this, config.path + "/" + config.name, {
      context: context,
      content: content
    }) || "/";

  // promise array in case users want both
  // base64 & color palettes generated
  // that means we have 2 promises to resolve
  var outputPromises = [];

  // output object
  var output = {};

  output.src = source; // original image source

  if (config.base64 === true) {
    outputPromises.push(lqip.base64(path));
  } else {
    // push null if the user did not wish to use Base64 to preserve the order
    outputPromises.push(null);
  }

  // color palette generation is set to false by default
  // since it is little bit slower than base64 generation
  // if users wants it, grab it!

  if (config.palette === true) {
    outputPromises.push(lqip.palette(path));
  } else {
    // push null if the user did not wish to use palette to preserve the order
    outputPromises.push(null);
  }

  // final step, resolving all the promises we got so far
  Promise.all(outputPromises)
    .then(data => {
      if (data) {
        // either null or base64
        if (data[0]) {
          output.preSrc = data[0];
        }
        // either null or palette
        if (data[1]) {
          output.palette = data[1];
        }
        // the output will be sent to webpack!
        callback(null, "module.exports = " + JSON.stringify(output) + ";");
      } else {
        callback(err, null);
      }
    })
    .catch(error => {
      console.error(error);
      callback(err, null);
    });
};
