!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()}(0,function(){"use strict";"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var e,a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),r=(function(e,t){e.exports=function(){function e(){console.log("[reveal] web components ready"),console.log("[reveal] elements ready, revealing the body"),window.document.body.removeAttribute("unresolved")}var t=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),n=function(e){function o(e,t){var n=2<arguments.length&&void 0!==arguments[2]&&arguments[2];!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=(void 0===t?"undefined":a(t))&&"function"!=typeof t?e:t}(this,(o.__proto__||Object.getPrototypeOf(o)).call(this));return r.tag=e,r._queue=[],r.template=document.createElement("template"),r.attachShadow({mode:"open"}),t&&r._queueAction({type:"setProperty",data:{name:"rhType",value:t}}),n||r.render(),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":a(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(o,HTMLElement),t(o,[{key:"rhType",get:function(){return this.getAttribute("rh-type")},set:function(e){this.setAttribute("rh-type",e)}}],[{key:"create",value:function(e){window.customElements.define(e.tag,e)}},{key:"RhTypes",get:function(){return{Container:"container",Content:"content",Pattern:"pattern"}}}]),t(o,[{key:"connectedCallback",value:function(){window.ShadyCSS&&ShadyCSS.styleElement(this),this._queue.length&&this._processQueue()}},{key:"_queueAction",value:function(e){this._queue.push(e)}},{key:"_processQueue",value:function(){var t=this;this._queue.forEach(function(e){t["_"+e.type](e.data)}),this._queue=[]}},{key:"_setProperty",value:function(e){var t=e.name,n=e.value;this[t]=n}},{key:"render",value:function(){this.shadowRoot.innerHTML=null,this.template.innerHTML=this.html,window.ShadyCSS&&ShadyCSS.prepareTemplate(this.template,this.tag),this.shadowRoot.appendChild(this.template.content.cloneNode(!0))}}]),o}();return window.WebComponents.ready?e():window.addEventListener("WebComponentsReady",e),n}()}(e={exports:{}},e.exports),e.exports),n=function(e){function n(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,n.tag));e._headingId="#heading";var t=e.shadowRoot.querySelector('[name="heading"]');return t.addEventListener("slotchange",function(){e._transport(t,e._headingId)}),e._transport(t,e._headingId),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,r),t(n,[{key:"html",get:function(){return'\n<style>\n:host {\n  display: block; }\n\n::slotted([slot="heading"]) {\n  display: none; }\n\narticle ::slotted([slot="meta"]) {\n  display: block;\n  font-size: var(--rhe-c-search-result_meta--FontSize, 0.875rem);\n  line-height: var(--rhe-c-search-result_meta--LineHeight, 1.3125rem);\n  margin: var(--rhe-c-search-result_meta--Margin, 0 0 0.375rem);\n  color: var(--rhe-c-search-result_meta--Color, #6e6e6e);\n  text-decoration: var(--rhe-c-search-result_meta--TextDecoration, none); }\n\narticle ::slotted([slot="meta"]:hover) {\n  text-decoration: var(--rhe-c-search-result_meta--TextDecorationHover, none); }\n\nheader h1,\nheader h2,\nheader h3,\nheader h4,\nheader h5,\nheader h6 {\n  margin: var(--rhe-c-search-result_heading--Margin, 0);\n  font-size: var(--rhe-c-search-result_heading--FontSize, 1.125rem);\n  line-height: var(--rhe-c-search-result_heading--LineHeight, 1.6875rem); }\n\nheader a {\n  color: var(--rhe-c-search-result_heading--FontColor, #06c);\n  text-decoration: var(--rhe-c-search-result_heading--TextDecoration, none);\n  font-weight: var(--rhe-c-search-result_heading--FontWeight, 600); }\n\nheader a:hover,\nheader a:focus {\n  color: var(--rhe-c-search-result_heading--FontColorHover, #004080);\n  text-decoration: var(--rhe-c-search-result_heading--TextDecorationHover, underline); }\n</style>\n<slot name="heading"></slot>\n<article>\n  <header id="heading"></header>\n  <slot name="meta"></slot>\n  <slot></slot>\n</article>'}},{key:"styleUrl",get:function(){return"rh-search-result.scss"}},{key:"templateUrl",get:function(){return"rh-search-result.html"}}],[{key:"tag",get:function(){return"rh-search-result"}}]),t(n,[{key:"_transport",value:function(e,t){var n=e.assignedNodes();n.length&&(this.shadowRoot.querySelector(t).innerHTML=n[0].outerHTML)}}]),n}();r.create(n)});
//# sourceMappingURL=rh-search-result.umd.js.map
