// Generated by CoffeeScript 1.10.0
(function() {
  var ID_CHARS, ID_CHARS_LEN, randomId;

  ID_CHARS = "23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz";

  ID_CHARS_LEN = ID_CHARS.length;

  randomId = function(prefix, n) {
    var digits, i, j, ref;
    if (prefix == null) {
      prefix = '';
    }
    if (n == null) {
      n = 6;
    }
    digits = '';
    for (i = j = 0, ref = n; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      digits += ID_CHARS.charAt(Math.floor(Math.random() * ID_CHARS_LEN));
    }
    return prefix + digits;
  };

  module.exports = randomId;

}).call(this);
