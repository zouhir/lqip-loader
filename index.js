/**
 * LQIP-LOADER by: Zouhir C
 * Library powering this loader: https://github.com/zouhir/lqip
 *
 * Which relies on:
 * http://sharp.dimens.io/en/stable/performance/#results
 * https://github.com/akfish/node-vibrant
 *
 */

var loaderUtils = require("loader-utils");
var lqip = require("lqip");

module.exports = function() {};
/**
 * @TODO: investigate pitching loader alternatives
 * recommended to work in sequence with file-loader or url-loader
 */
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

  // the source HQ image file
  var source = null;

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

  /**
   * promise array in case users want both
   * base64 & color palettes generated
   * that means we have 2 promises to resolve
   */
  var outputPromises = [];
  // output object
  var output = {};
  output.src = source;

  if (config.base64 === true) {
    outputPromises.push(lqip.base64(path));
  } else {
    /**
       * remember to push null
       * important to be resolve in order.
       */
    outputPromises.push(null);
  }

  /**
   * color palette generation is set to false by default
   * since it is little bit slower than base64 generation
   * if users wants it, grab it!
   */
  if (config.palette === true) {
    outputPromises.push(lqip.palette(path));
  } else {
    /**
     * remember to push null
     * important to be resolve in order.
     */
    outputPromises.push(null);
  }
  /**
   * final step:
   * resolve all promises we got
   */
  Promise.all(outputPromises)
    .then(data => {
      if (data) {
        // either null or base64
        if (data[0]) {
          output.preSrc = data[0];
        }
        // either null or palette
        if (data[1]) {
          output.palette = data[1].palette;
          output.dominant = data[1].dominant;
        }
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
