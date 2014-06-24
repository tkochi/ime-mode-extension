// CSS ime-mode -> inputmode converter extension.
// Author: takayoshi.kochi@gmail.com

"use strict";

var inputMode = {
  searchStyleSheets: function() {
    var len = document.styleSheets.length;
    for (var i = 0; i < len; ++i) {
      var css = document.styleSheets[i];
      for (var i = 0; i < css.cssRules.length; ++i) {
	var r = css.cssRules[i];
	if (r == 1) {  // style rule
	  console.log(r.cssText);
	}
      }
    }
  },

  init: function() {
    var self = this;
    self.searchStyleSheets();
  }
};

inputMode.init();
