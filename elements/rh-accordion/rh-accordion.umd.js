!function(e,t){if("function"==typeof define&&define.amd)define(["../rhelement/rhelement.umd.js"],t);else if("undefined"!=typeof exports)t(require("../rhelement/rhelement.umd.js"));else{t(e.rhelementUmd),e.rhAccordion={}}}(this,function(e){"use strict";var t,r=(t=e)&&t.__esModule?t:{default:t};function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var s=function e(t,n,a){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,n);if(void 0===r){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,a)}if("value"in r)return r.value;var o=r.get;return void 0!==o?o.call(a):void 0},c=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}();function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(){return Math.random().toString(36).substr(2,9)}Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),n=t.length>>>0;if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var a=arguments[1],r=0;r<n;){var i=t[r];if(e.call(a,i,r,t))return r;r++}return-1}});var n=function(e){function n(){return o(this,n),l(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,n.tag))}return d(n,r.default),c(n,[{key:"html",get:function(){return'\n<style>\n:host {\n  display: block;\n  position: relative;\n  overflow: hidden;\n  margin: 0; }\n\n:host(rh-accordion[theme="striped"]) ::slotted(rh-accordion-header.even) {\n  background-color: var(--white, white); }\n</style>\n\n<slot></slot>'}},{key:"styleUrl",get:function(){return"rh-accordion.scss"}},{key:"templateUrl",get:function(){return"rh-accordion.html"}}],[{key:"tag",get:function(){return"rh-accordion"}},{key:"observedAttributes",get:function(){return["theme"]}}]),c(n,[{key:"connectedCallback",value:function(){s(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"connectedCallback",this).call(this),this.setAttribute("role","presentation"),this.setAttribute("defined",""),this.addEventListener(n.tag+"-change",this._changeHandler),this.addEventListener("keydown",this._keydownHandler),Promise.all([customElements.whenDefined(h.tag),customElements.whenDefined(a.tag)]).then(this._linkPanels())}},{key:"disconnectedCallback",value:function(){this.removeEventListener(n.tag+"-change",this._changeHandler),this.removeEventListener("keydown",this._keydownHandler)}},{key:"attributeChangedCallback",value:function(e,t,n){if("theme"===e){var a=this.querySelectorAll(h.tag);"striped"===n?[].concat(i(a)).forEach(function(e,t){var n=t%2?"even":"odd";e.classList.add(n)}):[].concat(i(a)).forEach(function(e,t){e.classList.remove("even","odd")})}}},{key:"toggle",value:function(e){var t=this._allHeaders(),n=this._allPanels(),a=t[e],r=n[e];a&&r&&(a.expanded?(this._collapseHeader(a),this._collapsePanel(r)):(this._expandHeader(a),this._expandPanel(r)))}},{key:"expand",value:function(e){var t=this._allHeaders(),n=this._allPanels(),a=t[e],r=n[e];a&&r&&(this._expandHeader(a),this._expandPanel(r))}},{key:"expandAll",value:function(){var t=this,e=this._allHeaders(),n=this._allPanels();e.forEach(function(e){return t._expandHeader(e)}),n.forEach(function(e){return t._expandPanel(e)})}},{key:"collapse",value:function(e){var t=this._allHeaders(),n=this._allPanels(),a=t[e],r=n[e];a&&r&&(this._collapseHeader(a),this._collapsePanel(r))}},{key:"collapseAll",value:function(){var t=this,e=this._allHeaders(),n=this._allPanels();e.forEach(function(e){return t._collapseHeader(e)}),n.forEach(function(e){return t._collapsePanel(e)})}},{key:"_linkPanels",value:function(){var n=this;this._allHeaders().forEach(function(e){var t=n._panelForHeader(e);e.setAttribute("aria-controls",t.id),t.setAttribute("aria-labelledby",e.id)})}},{key:"_changeHandler",value:function(e){if(!this.classList.contains("animating")){var t=e.target,n=e.target.nextElementSibling;e.detail.expanded?(this._expandHeader(t),this._expandPanel(n)):(this._collapseHeader(t),this._collapsePanel(n))}}},{key:"_toggle",value:function(e,t){}},{key:"_expandHeader",value:function(e){e.expanded=!0}},{key:"_expandPanel",value:function(e){if(!e.expanded){e.expanded=!0;var t=e.getBoundingClientRect().height;this._animate(e,0,t)}}},{key:"_collapseHeader",value:function(e){e.expanded=!1}},{key:"_collapsePanel",value:function(e){if(e.expanded){var t=e.getBoundingClientRect().height;e.expanded=!1,this._animate(e,t,0)}}},{key:"_animate",value:function(e,t,n){var a=this;e.classList.add("animating"),e.style.height=t+"px",requestAnimationFrame(function(){requestAnimationFrame(function(){e.style.height=n+"px",e.classList.add("animating"),e.addEventListener("transitionend",a._transitionEndHandler)})})}},{key:"_keydownHandler",value:function(e){var t=e.target;if(this._isHeader(t)){var n=void 0;switch(e.key){case"ArrowDown":case"Down":case"ArrowRight":case"Right":n=this._nextHeader();break;case"ArrowUp":case"Up":case"ArrowLeft":case"Left":n=this._previousHeader();break;case"Home":n=this._firstHeader();break;case"End":n=this._lastHeader();break;default:return}n.shadowRoot.querySelector("button").focus()}}},{key:"_transitionEndHandler",value:function(e){e.target.style.height="",e.target.classList.remove("animating"),e.target.removeEventListener("transitionend",this._transitionEndHandler)}},{key:"_allHeaders",value:function(){return[].concat(i(this.querySelectorAll(h.tag)))}},{key:"_allPanels",value:function(){return[].concat(i(this.querySelectorAll(a.tag)))}},{key:"_panelForHeader",value:function(e){var t=e.nextElementSibling;if(t.tagName.toLowerCase()===a.tag)return t;console.error(n.tag+": Sibling element to a header needs to be a panel")}},{key:"_previousHeader",value:function(){var e=this._allHeaders(),t=e.findIndex(function(e){return e===document.activeElement})-1;return e[(t+e.length)%e.length]}},{key:"_nextHeader",value:function(){var e=this._allHeaders(),t=e.findIndex(function(e){return e===document.activeElement})+1;return e[t%e.length]}},{key:"_firstHeader",value:function(){return this._allHeaders()[0]}},{key:"_lastHeader",value:function(){var e=this._allHeaders();return e[e.length-1]}},{key:"_isHeader",value:function(e){return e.tagName.toLowerCase()===h.tag}}]),n}(),h=function(e){function a(){o(this,a);var e=l(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,a.tag));return e._clickHandler=e._clickHandler.bind(e),e}return d(a,r.default),c(a,[{key:"html",get:function(){return'\n<style>\n:host {\n  display: block;\n  background: var(--gray-nimbus, #ededed); }\n\n:host(.animating) {\n  transition: transform 0.3s ease-in-out; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 1px; }\n\nbutton {\n  padding: 10px;\n  margin: 0;\n  border: 1px solid transparent;\n  font-family: inherit;\n  font-size: 16px;\n  line-height: 1.5;\n  min-height: 3em;\n  height: auto;\n  cursor: pointer;\n  width: 100%;\n  text-align: left;\n  background: none; }\n\nbutton:focus {\n  outline: 1px solid blue; }\n\nbutton::-moz-focus-inner {\n  border: 0; }\n\n[aria-expanded] {\n  position: relative;\n  display: block;\n  font-weight: normal;\n  padding-left: 2.5em; }\n\n[aria-expanded="false"]::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: calc(10px + 0.5em);\n  display: block;\n  border-style: solid;\n  border-width: 0.15em 0.15em 0 0;\n  height: 0.35em;\n  width: 0.35em;\n  transform: rotate(45deg);\n  margin-left: 1em;\n  text-align: center;\n  transition: transform 0.15s; }\n\n[aria-expanded="true"]::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: calc(10px + 0.5em);\n  display: block;\n  width: 0.35em;\n  height: 0.35em;\n  border-style: solid;\n  border-width: 0.15em 0.15em 0 0;\n  margin-left: 1em;\n  text-align: center;\n  transition: all 0.15s;\n  transform: rotate(135deg); }\n</style>\n\n<button aria-expanded="false" role="tab"></button>'}},{key:"styleUrl",get:function(){return"rh-accordion-header.scss"}},{key:"templateUrl",get:function(){return"rh-accordion-header.html"}}],[{key:"tag",get:function(){return"rh-accordion-header"}},{key:"observedAttributes",get:function(){return["aria-expanded"]}}]),c(a,[{key:"connectedCallback",value:function(){s(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"connectedCallback",this).call(this),this.hasAttribute("role")||this.setAttribute("role","header"),this.id||(this.id=a.tag+"-"+u()),this.button=this.shadowRoot.querySelector("button");var e=this.children[0],t=!1;if(e){switch(e.tagName){case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":t=!0}var n=document.createElement(e.tagName);this.button.innerText=e.innerText,n.appendChild(this.button),this.shadowRoot.appendChild(n)}else this.button.innerText=this.textContent.trim();t||console.warn(a.tag+": The first child in the light DOM must be a Header level tag (h1, h2, h3, h4, h5, or h6)"),this.addEventListener("click",this._clickHandler)}},{key:"disconnectedCallback",value:function(){this.removeEventListener("click",this._clickHandler)}},{key:"_clickHandler",value:function(e){this.dispatchEvent(new CustomEvent(n.tag+"-change",{detail:{expanded:!this.expanded},bubbles:!0}))}},{key:"expanded",get:function(){return this.hasAttribute("aria-expanded")},set:function(e){(e=Boolean(e))?(this.setAttribute("aria-expanded",!0),this.button.setAttribute("aria-expanded",!0)):(this.removeAttribute("aria-expanded"),this.button.setAttribute("aria-expanded",!1))}}]),a}(),a=function(e){function t(){return o(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,t.tag))}return d(t,r.default),c(t,[{key:"html",get:function(){return'\n<style>\n:host {\n  display: none;\n  overflow: hidden;\n  background: white;\n  will-change: height; }\n\n:host([expanded]) {\n  display: block; }\n\n:host(.animating) {\n  display: block;\n  transition: height 0.3s ease-in-out; }\n\n.container {\n  border: 2px solid #f7f7f7;\n  border-top: none;\n  padding: 20px; }\n</style>\n\n<div tabindex="-1" role="tabpanel">\n  <div class="container">\n    <slot></slot>\n  </div>\n</div>'}},{key:"styleUrl",get:function(){return"rh-accordion-panel.scss"}},{key:"templateUrl",get:function(){return"rh-accordion-panel.html"}}],[{key:"tag",get:function(){return"rh-accordion-panel"}}]),c(t,[{key:"connectedCallback",value:function(){s(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"connectedCallback",this).call(this),this.hasAttribute("role")||this.setAttribute("role","region"),this.id||(this.id=t.tag+"-"+u())}},{key:"expanded",get:function(){return this.hasAttribute("expanded")},set:function(e){Boolean(e)?this.setAttribute("expanded",""):this.removeAttribute("expanded")}}]),t}();r.default.create(h),r.default.create(a),r.default.create(n)});