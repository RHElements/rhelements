!function(e,t){if("function"==typeof define&&define.amd)define(["exports","./reveal.compiled.js"],t);else if("undefined"!=typeof exports)t(exports,require("./reveal.compiled.js"));else{var n={};t(n,e.revealCompiled),e.rhelement=n}}(this,function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(e){{if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}}(t);var o=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}();var r=function(e){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this));return t.tag=e,t.template=document.createElement("template"),t.template.innerHTML=t.html,window.ShadyCSS&&t.html&&ShadyCSS.prepareTemplate(t.template,t.tag),t.attachShadow({mode:"open"}),t.html&&t.shadowRoot.appendChild(t.template.content.cloneNode(!0)),t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,HTMLElement),o(n,null,[{key:"create",value:function(e){window.customElements.define(e.tag,e)}}]),o(n,[{key:"connectedCallback",value:function(){window.ShadyCSS&&ShadyCSS.styleElement(this)}}]),n}();n.startTimer(),window.reveal=n,e.default=r});