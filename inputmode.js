// CSS ime-mode -> inputmode converter extension.
// Author: takayoshi.kochi@gmail.com

"use strict";

var inputMode = {
  searchStyleSheets: function() {
    var count = 0;

    var len = document.styleSheets.length;
    for (var i = 0; i < len; ++i) {
      var css = document.styleSheets[i];
      for (var j = 0; j < css.cssRules.length; ++j) {
        var r = css.cssRules[j];
        if (r.type == 1) {  // style rule
          // FIXME:
          // It seems unsupported properties are discarded at parsing.
          // console.log(r.cssText);
        }
      }
    }

    // auto -> ?
    // active -> inputmode=kana
    // inactive -> inputmode=latin
    // disabled -> inputmode=latin (not 100%, but good enough)
    var els = document.querySelectorAll('input[style]');
    for (var i = 0; i < els.length; ++i) {
      if (!els[i].hasAttribute('style'))
        continue;
      var style = els[i].getAttribute('style');
      var styles = style.split(/;\s*/);
      for (var j = 0; j < styles.length; ++j) {
        if (styles[j].match(/ime-mode/)) {
          var property = styles[j].substr(styles[j].indexOf(':') + 1);
          if (property.match(/inactive/) || property.match(/disabled/)) {
            els[i].setAttribute('inputmode', 'latin');
	    ++count;
          } else if (property.match(/active/)) {
            els[i].setAttribute('inputmode', 'kana');
	    ++count;
          }
        }
      }
    }
    console.log('replaced ' + count + ' styles.');
  },

  init: function() {
    var self = this;
    self.searchStyleSheets();
  }
};

inputMode.init();
