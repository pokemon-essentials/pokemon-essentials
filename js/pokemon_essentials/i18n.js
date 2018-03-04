var i18n = i18n || {};
/**
 * locate the given text in current language
 * @param  {string} text text to translate
 * @return {[type]}      [description]
 */
i18n._ = function(text) {
  var params = Array.prototype.slice.call(arguments, 1);
  return text.format.apply(text, params);
}
