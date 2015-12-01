// Generated by CoffeeScript 1.10.0
(function() {
  var Canvas, CanvasRenderingContext2DShim, Stenographer, canvg, canvgc;

  Canvas = require("canvas");

  canvg = require('../canvg/canvg');

  CanvasRenderingContext2DShim = require('./CanvasRenderingContext2DShim');

  Stenographer = require('./stenographer');

  canvgc = function(svgAsText, callsPerFunc, onComplete) {
    var canvas, context2d, shim, stenographer;
    if (callsPerFunc == null) {
      callsPerFunc = null;
    }
    canvas = new Canvas();
    context2d = canvas.getContext('2d');
    stenographer = new Stenographer(callsPerFunc);
    shim = new CanvasRenderingContext2DShim(stenographer, context2d);
    canvas.getContext = function(type) {
      if (type === '2d') {
        return shim;
      } else {
        return null;
      }
    };
    canvg(canvas, svgAsText, {
      ignoreDimensions: true,
      ignoreClear: true,
      ignoreMouse: true,
      renderCallback: function() {
        onComplete.call(null, null, stenographer.toJS(canvas.width, canvas.height));
      }
    });
  };

  module.exports = canvgc;

}).call(this);