module.exports = function(str, sep) {
  str = (str || '').toString().toLowerCase();

  sep = Array.isArray(sep) ? sep : (sep ? [sep] : []);
  sep.push('\\s');

  var r = new RegExp('(?:^|' + sep.join('|') + ')\\S', 'g');

  return str.replace(r, function(s) {
    return s.toUpperCase();
  });
};