// Generated by CoffeeScript 1.10.0

/*
  An Example of how to render the output of COA
 */

(function() {
  var Painter;

  Painter = (function() {

    /*
     * @param {Array} renderList
     * @param {Function} defer
     */
    function Painter(plan, defer) {
      this.plan = plan;
      this.defer = defer;
      this.renderId = 0;
      this.ready = false;
      this.renderCtx = {
        stack: 0
      };
      this.renderListPosition = 0;
      this.rendering = false;
    }

    Painter.prototype.loadImages = function(cb) {
      var data, fn1, imageNames, name, ref;
      imageNames = _.keys(this.plan.i);
      if (imageNames.length === 0) {
        this.ready = true;
        this.defer(cb);
      }
      ref = this.plan.i;
      fn1 = (function(_this) {
        return function(name, data) {
          var img;
          img = new Image();
          img.onload = function() {
            _this.renderCtx[name] = img;
            if (_.every(imageNames, function(n) {
              return _this.renderCtx[n] != null;
            })) {
              _this.ready = true;
              _this.defer(cb);
            }
          };
          return img.src = data;
        };
      })(this);
      for (name in ref) {
        data = ref[name];
        fn1(name, data);
      }
    };

    Painter.prototype.cancel = function(context2d) {
      this.renderListPosition = 0;
      this.rendering = false;
      while (this.renderCtx.stack > 0) {
        context2d.restore();
        this.renderCtx.stack--;
      }
    };

    Painter.prototype.renderImmediately = function(context2d) {
      var f, i, len, ref;
      if (!this.ready) {
        throw new Error('Painter not yet ready.');
      }
      ref = this.plan.d;
      for (i = 0, len = ref.length; i < len; i++) {
        f = ref[i];
        f(context2d, this.renderCtx);
      }
    };

    Painter.prototype.renderDeferred = function(context2d, cb) {
      var enqueue;
      if (!this.ready) {
        throw new Error('Painter not yet ready.');
      }
      this.rendering = true;
      this.renderId += 1;
      this.renderListPosition = 0;
      enqueue = (function(_this) {
        return function(renderId) {
          var fn;
          if (_this.renderListPosition < _this.plan.d.length) {
            fn = _this.plan.d[_this.renderListPosition];
            _this.renderListPosition += 1;
            _this.defer(function() {
              if (!_this.rendering || renderId !== _this.renderId) {
                console.log('Rendering cancelled for renderId', renderId);
                return;
              }
              fn(context2d, _this.renderCtx);
              enqueue(renderId);
            });
          } else {
            _this.renderId = 0;
            _this.renderListPosition = 0;
            _this.rendering = false;
            _this.defer(cb);
          }
        };
      })(this);
      enqueue(this.renderId);
    };

    return Painter;

  })();

  window.Painter = Painter;

}).call(this);
