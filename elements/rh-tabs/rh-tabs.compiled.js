!function(t,e){if("function"==typeof define&&define.amd)define(["../rhelement/rhelement.compiled.js"],e);else if("undefined"!=typeof exports)e(require("../rhelement/rhelement.compiled.js"));else{e(t.rhelementCompiled),t.rhTabs={}}}(this,function(t){"use strict";var e,r=(e=t)&&e.__esModule?e:{default:e};function a(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return Array.from(t)}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var i=function t(e,r,a){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,r);if(void 0===n){var o=Object.getPrototypeOf(e);return null===o?void 0:t(o,r,a)}if("value"in n)return n.value;var i=n.get;return void 0!==i?i.call(a):void 0},c=function(){function t(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,r,a){return r&&t(e.prototype,r),a&&t(e,a),e}}();function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(t){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),r=e.length>>>0;if("function"!=typeof t)throw new TypeError("predicate must be a function");for(var a=arguments[1],n=0;n<r;){var o=e[n];if(t.call(a,o,n,e))return o;n++}},configurable:!0,writable:!0}),Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(t){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),r=e.length>>>0;if("function"!=typeof t)throw new TypeError("predicate must be a function");for(var a=arguments[1],n=0;n<r;){var o=e[n];if(t.call(a,o,n,e))return n;n++}return-1},configurable:!0,writable:!0});var d=document.createElement("template");d.innerHTML='\n<style>:host {\n  display: block; }\n\n.tabs {\n  display: flex;\n  background-color: var(--rhe-c-tabs__tabs--BackgroundColor, transparent);\n  border-top: var(--rhe-c-tabs__tabs--BorderTop, 0);\n  border-right: var(--rhe-c-tabs__tabs--BorderRight, 0);\n  border-bottom: var(--rhe-c-tabs__tabs--BorderBottom, 1px solid #ccc);\n  border-left: var(--rhe-c-tabs__tabs--BorderLeft, 0); }\n\n.panels {\n  padding-top: var(--rhe-c-tabs__panel--PaddingTop, 1rem);\n  padding-right: var(--rhe-c-tabs__panel--PaddingTop, 0);\n  padding-bottom: var(--rhe-c-tabs__panel--PaddingTop, 0);\n  padding-left: var(--rhe-c-tabs__panel--PaddingTop, 0); }\n\n:host([vertical]) {\n  display: flex; }\n\n:host([vertical]) .tabs {\n  flex-direction: column;\n  width: var(--rhe-c-tabs__tabs--vertical--Width, 25%);\n  background-color: var(--rhe-c-tabs__tabs--vertical--BackgroundColor, transparent);\n  border-top: var(--rhe-c-tabs__tabs--vertical--BorderTop, 0);\n  border-right: var(--rhe-c-tabs__tabs--vertical--BorderRight, 1px solid #ccc);\n  border-bottom: var(--rhe-c-tabs__tabs--vertical--BorderBottom, 0);\n  border-left: var(--rhe-c-tabs__tabs--vertical--BorderLeft, 0); }\n\n:host([vertical]) .tabs ::slotted(rh-tab) {\n  border-top: var(--rhe-c-tabs__tab--selected--BorderTop, 1px solid transparent);\n  border-right: var(--rhe-c-tabs__tab--selected--BorderRight, 0);\n  border-bottom: var(--rhe-c-tabs__tab--selected--BorderBottom, 1px solid transparent);\n  border-left: var(--rhe-c-tabs__tab--selected--BorderLeft, 1px solid transparent); }\n\n:host([vertical]) .tabs ::slotted(rh-tab[aria-selected="true"]) {\n  padding-top: var(--rhe-c-tabs__tab--selected--PaddingTop, 14px);\n  padding-right: var(--rhe-c-tabs__tab--selected--PaddingTop, 55px);\n  padding-bottom: var(--rhe-c-tabs__tab--selected--PaddingTop, 24px);\n  padding-left: var(--rhe-c-tabs__tab--selected--PaddingTop, 15px);\n  margin-top: var(--rhe-c-tabs__tab--selected--MarginTop, 0);\n  margin-right: var(--rhe-c-tabs__tab--selected--MarginRight, -1px);\n  margin-bottom: var(--rhe-c-tabs__tab--selected--MarginBottom, 0);\n  margin-left: var(--rhe-c-tabs__tab--selected--MarginLeft, 0);\n  border-top: var(--rhe-c-tabs__tab--selected--BorderTop, 1px solid #ccc);\n  border-right: var(--rhe-c-tabs__tab--selected--BorderRight, 0);\n  border-bottom: var(--rhe-c-tabs__tab--selected--BorderBottom, 1px solid #ccc);\n  border-left: var(--rhe-c-tabs__tab--selected--BorderLeft, 1px solid #ccc); }\n\n:host([vertical]) .panels {\n  padding-top: var(--rhe-c-tabs__panel-vertical--PaddingTop, 0);\n  padding-right: var(--rhe-c-tabs__panel-vertical--PaddingTop, 1rem);\n  padding-bottom: var(--rhe-c-tabs__panel-vertical--PaddingTop, 0);\n  padding-left: var(--rhe-c-tabs__panel-vertical--PaddingTop, 2rem); }\n\n:host([type="subtabs"]) .tabs ::slotted(rh-tab) {\n  padding-top: var(--rhe-c-subtabs__tab--PaddingTop, 6px);\n  padding-right: var(--rhe-c-subtabs__tab--PaddingTop, 0);\n  padding-bottom: var(--rhe-c-subtabs__tab--PaddingTop, 24px);\n  padding-left: var(--rhe-c-subtabs__tab--PaddingTop, 0);\n  margin: 0;\n  border: 0; }\n\n:host([type="subtabs"]) rh-tab .indicator {\n  bottom: var(--rhe-c-tabs__indicator--hover--Bottom, 12px); }</style>\n<div class="tabs">\n  <slot name="tab"></slot>\n</div>\n<div class="panels">\n  <slot name="panel"></slot>\n</div>\n';var l=40,b=37,h=39,_=38,v=36,p=35;function u(){return Math.random().toString(36).substr(2,9)}var f=function(t){function e(){n(this,e);var t=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e.is,d));return t._onSlotChange=t._onSlotChange.bind(t),t._tabSlot=t.shadowRoot.querySelector('slot[name="tab"]'),t._panelSlot=t.shadowRoot.querySelector('slot[name="panel"]'),t._tabSlot.addEventListener("slotchange",t._onSlotChange),t._panelSlot.addEventListener("slotchange",t._onSlotChange),t}return s(e,r.default),c(e,null,[{key:"is",get:function(){return"rh-tabs"}},{key:"observedAttributes",get:function(){return["vertical"]}}]),c(e,[{key:"connectedCallback",value:function(){var t=this;i(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"connectedCallback",this).call(this),this.addEventListener("keydown",this._onKeyDown),this.addEventListener("click",this._onClick),this.hasAttribute("role")||this.setAttribute("role","tablist"),Promise.all([customElements.whenDefined("rh-tab"),customElements.whenDefined("rh-tab-panel")]).then(function(){return t._linkPanels()})}},{key:"disconnectedCallback",value:function(){this.removeEventListener("keydown",this._onKeyDown),this.removeEventListener("click",this._onClick)}},{key:"attributeChangedCallback",value:function(){this.hasAttribute("vertical")?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation")}},{key:"select",value:function(t){t&&("rh-tab"===t.tagName.toLowerCase()?this._selectTab(t):console.warn(e.is+": the tab must be a rh-tab element"))}},{key:"selectIndex",value:function(t){if(null!==t){var r=parseInt(t,10),a=this._allTabs()[r];a?this._selectTab(a):console.warn(e.is+": tab "+t+" does not exist")}}},{key:"_onSlotChange",value:function(){this._linkPanels()}},{key:"_linkPanels",value:function(){var t=this._allTabs();t.forEach(function(t){var r=t.nextElementSibling;"rh-tab-panel"===r.tagName.toLowerCase()?(t.setAttribute("aria-controls",r.id),r.setAttribute("aria-labelledby",t.id)):console.warn(e.is+": tab #"+t.id+" is not a sibling of a <rh-tab-panel>")});var r=t.find(function(t){return t.selected})||t[0];this._selectTab(r)}},{key:"_allPanels",value:function(){return[].concat(a(this.querySelectorAll("rh-tab-panel")))}},{key:"_allTabs",value:function(){return[].concat(a(this.querySelectorAll("rh-tab")))}},{key:"_panelForTab",value:function(t){var e=t.getAttribute("aria-controls");return this.querySelector("#"+e)}},{key:"_prevTab",value:function(){var t=this._allTabs();return t[(t.findIndex(function(t){return t.selected})-1+t.length)%t.length]}},{key:"_firstTab",value:function(){return this._allTabs()[0]}},{key:"_lastTab",value:function(){var t=this._allTabs();return t[t.length-1]}},{key:"_nextTab",value:function(){var t=this._allTabs();return t[(t.findIndex(function(t){return t.selected})+1)%t.length]}},{key:"reset",value:function(){var t=this._allTabs(),e=this._allPanels();t.forEach(function(t){return t.selected=!1}),e.forEach(function(t){return t.hidden=!0})}},{key:"_selectTab",value:function(t){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.reset();var a=this._panelForTab(t),n=!1;if(!a)throw new Error("No panel with id "+a.id);this.selected&&this.selected!==t&&(n=!0,this.dispatchEvent(new CustomEvent(e.is+":hidden-tab",{bubbles:!0,detail:{tab:this.selected}}))),t.selected=!0,a.hidden=!1,r&&t.focus();var o=this._allTabs().findIndex(function(t){return t.selected});this.selected=t,this.selectedIndex=o,n&&this.dispatchEvent(new CustomEvent(e.is+":shown-tab",{bubbles:!0,detail:{tab:this.selected}}))}},{key:"_onKeyDown",value:function(t){if("tab"===t.target.getAttribute("role")&&!t.altKey){var e=void 0;switch(t.keyCode){case b:case _:e=this._prevTab();break;case h:case l:e=this._nextTab();break;case v:e=this._firstTab();break;case p:e=this._lastTab();break;default:return}t.preventDefault(),this._selectTab(e,!0)}}},{key:"_onClick",value:function(t){"tab"===t.target.getAttribute("role")&&this._selectTab(t.target)}}]),e}();window.customElements.define(f.is,f);var g=document.createElement("template");g.innerHTML='\n  <style>\n    :host {\n  position: relative;\n  display: block;\n  padding-top: var(--rhe-c-tabs__tab--PaddingTop, 14px);\n  padding-right: var(--rhe-c-tabs__tab--PaddingTop, 54px);\n  padding-bottom: var(--rhe-c-tabs__tab--PaddingTop, 24px);\n  padding-left: var(--rhe-c-tabs__tab--PaddingTop, 15px);\n  margin-top: var(--rhe-c-tabs__tab--MarginTop, 0);\n  margin-right: var(--rhe-c-tabs__tab--MarginRight, 0);\n  margin-bottom: var(--rhe-c-tabs__tab--MarginBottom, 0);\n  margin-left: var(--rhe-c-tabs__tab--MarginLeft, 0);\n  border-top: var(--rhe-c-tabs__tab--BorderTop, 1px solid transparent);\n  border-right: var(--rhe-c-tabs__tab--BorderRight, 1px solid transparent);\n  border-bottom: var(--rhe-c-tabs__tab--BorderBottom, 0);\n  border-left: var(--rhe-c-tabs__tab--BorderLeft, 1px solid transparent);\n  background-color: var(--rhe-c-tabs__tab--BackgroundColor, transparent);\n  text-transform: var(--rhe-c-tabs__tab--TextTransform, none);\n  font-weight: var(--rhe-c-tabs__tab--FontWeight, normal);\n  color: var(--rhe-c-tabs__tab--Color, #333);\n  white-space: nowrap;\n  cursor: pointer; }\n\n:host([aria-selected="true"]) {\n  padding-top: var(--rhe-c-tabs__tab--selected--PaddingTop, 14px);\n  padding-right: var(--rhe-c-tabs__tab--selected--PaddingTop, 54px);\n  padding-bottom: var(--rhe-c-tabs__tab--selected--PaddingTop, 25px);\n  padding-left: var(--rhe-c-tabs__tab--selected--PaddingTop, 15px);\n  margin-top: var(--rhe-c-tabs__tab--selected--MarginTop, 0);\n  margin-right: var(--rhe-c-tabs__tab--selected--MarginRight, 0);\n  margin-bottom: var(--rhe-c-tabs__tab--selected--MarginBottom, -1px);\n  margin-left: var(--rhe-c-tabs__tab--selected--MarginLeft, 0);\n  border-top: var(--rhe-c-tabs__tab--selected--BorderTop, 1px solid #ccc);\n  border-right: var(--rhe-c-tabs__tab--selected--BorderRight, 1px solid #ccc);\n  border-bottom: var(--rhe-c-tabs__tab--selected--BorderBottom, 0);\n  border-left: var(--rhe-c-tabs__tab--selected--BorderLeft, 1px solid #ccc);\n  background-color: var(--rhe-c-tabs__tab--selected--BackgroundColor, #fff);\n  text-transform: var(--rhe-c-tabs__tab--selected--TextTransform, none);\n  font-weight: var(--rhe-c-tabs__tab--selected--FontWeight, normal);\n  color: var(--rhe-c-tabs__tab--selected--Color, #333); }\n\n.indicator {\n  display: var(--rhe-c-tabs__indicator--Display, block);\n  position: absolute;\n  top: var(--rhe-c-tabs__indicator--Top, auto);\n  right: var(--rhe-c-tabs__indicator--Right, auto);\n  bottom: var(--rhe-c-tabs__indicator--Bottom, 12px);\n  left: var(--rhe-c-tabs__indicator--Left, auto);\n  height: var(--rhe-c-tabs__indicator--Height, 4px);\n  width: var(--rhe-c-tabs__indicator--Width, 22px);\n  background-color: var(----rhe-c-tabs__indicator--BackgroundColor, #828282);\n  border-top: var(--rhe-c-tabs__indicator--BorderTop, 0);\n  border-right: var(--rhe-c-tabs__indicator--BorderRight, 0);\n  border-bottom: var(--rhe-c-tabs__indicator--BorderBottom, 0);\n  border-left: var(--rhe-c-tabs__indicator--BorderLeft, 0); }\n\n:host(:hover) .indicator {\n  display: var(--rhe-c-tabs__indicator--hover--Display, block);\n  top: var(--rhe-c-tabs__indicator--hover--Top, auto);\n  right: var(--rhe-c-tabs__indicator--hover--Right, auto);\n  bottom: var(--rhe-c-tabs__indicator--hover--Bottom, 12px);\n  left: var(--rhe-c-tabs__indicator--hover--Left, auto);\n  height: var(--rhe-c-tabs__indicator--hover--Height, 4px);\n  width: var(--rhe-c-tabs__indicator--hover--Width, 22px);\n  background-color: var(--rhe-c-tabs__indicator--hover--BackgroundColor, #2b9af3);\n  border-top: var(--rhe-c-tabs__indicator--hover--BorderTop, 0);\n  border-right: var(--rhe-c-tabs__indicator--hover--BorderRight, 0);\n  border-bottom: var(--rhe-c-tabs__indicator--hover--BorderBottom, 0);\n  border-left: var(--rhe-c-tabs__indicator--hover--BorderLeft, 0); }\n\n:host(:focus) {\n  outline: var(--rhe-c-tabs__tab--focus--Outline, 2px solid #2b9af3); }\n\n:host([aria-selected="true"]) .indicator,\n:host([aria-selected="true"]:hover) .indicator {\n  display: var(--rhe-c-tabs__indicator--selected--Display, block);\n  top: var(--rhe-c-tabs__indicator--selected--Top, auto);\n  right: var(--rhe-c-tabs__indicator--selected--Right, auto);\n  bottom: var(--rhe-c-tabs__indicator--selected--Bottom, 13px);\n  left: var(--rhe-c-tabs__indicator--selected--Left, auto);\n  height: var(--rhe-c-tabs__indicator--selected--Height, 4px);\n  width: var(--rhe-c-tabs__indicator--selected--Width, 22px);\n  background-color: var(--rhe-c-tabs__indicator--selected--BackgroundColor, #06c);\n  border-top: var(--rhe-c-tabs__indicator--selected--BorderTop, #828282);\n  border-right: var(--rhe-c-tabs__indicator--selected--BorderRight, #828282);\n  border-bottom: var(--rhe-c-tabs__indicator--selected--BorderBottom, 0);\n  border-left: var(--rhe-c-tabs__indicator--selected--BorderLeft, #828282); }\n\n:host([vertical]) .indicator {\n  top: var(--rhe-c-tabs__indicator--vertical--Top, auto);\n  right: var(--rhe-c-tabs__indicator--vertical--Right, auto);\n  bottom: var(--rhe-c-tabs__indicator--vertical--Bottom, 13px);\n  left: var(--rhe-c-tabs__indicator--vertical--Left, auto);\n  height: var(--rhe-c-tabs__indicator--vertical--Height, 4px);\n  width: var(--rhe-c-tabs__indicator--vertical--Width, 22px);\n  background-color: var(----rhe-c-tabs__indicator--vertical--BackgroundColor, #828282);\n  border-top: var(--rhe-c-tabs__indicator--vertical--BorderTop, 0);\n  border-right: var(--rhe-c-tabs__indicator--vertical--BorderRight, 0);\n  border-bottom: var(--rhe-c-tabs__indicator--vertical--BorderBottom, 0);\n  border-left: var(--rhe-c-tabs__indicator--vertical--BorderLeft, 0); }\n\n:host([aria-selected="true"][vertical]) .indicator {\n  display: var(--rhe-c-tabs__indicator--vertical--selected--Display, block);\n  top: var(--rhe-c-tabs__indicator--vertical--selected--Top, auto);\n  right: var(--rhe-c-tabs__indicator--vertical--selected--Right, auto);\n  bottom: var(--rhe-c-tabs__indicator--vertical--selected--Bottom, 13px);\n  left: var(--rhe-c-tabs__indicator--vertical--selected--Left, auto);\n  height: var(--rhe-c-tabs__indicator--vertical--selected--Height, 4px);\n  width: var(--rhe-c-tabs__indicator--vertical--selected--Width, 22px);\n  background-color: var(--rhe-c-tabs__indicator--vertical--selected--BackgroundColor, #06c);\n  border-top: var(--rhe-c-tabs__indicator--vertical--selected--BorderTop, 0);\n  border-right: var(--rhe-c-tabs__indicator--vertical--selected--BorderRight, 0);\n  border-bottom: var(--rhe-c-tabs__indicator--vertical--selected--BorderBottom, 0);\n  border-left: var(--rhe-c-tabs__indicator--vertical--selected--BorderLeft, 0); }\n\n  </style>\n  <slot></slot>\n<div class="indicator"></div>\n';var m=function(t){function e(){return n(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e.is,g))}return s(e,r.default),c(e,null,[{key:"is",get:function(){return"rh-tab"}},{key:"observedAttributes",get:function(){return["aria-selected"]}}]),c(e,[{key:"connectedCallback",value:function(){i(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"connectedCallback",this).call(this),this.setAttribute("role","tab"),this.id||(this.id=e.is+"-"+u()),this.setAttribute("aria-selected","false"),this.setAttribute("tabindex",-1),this.parentNode.hasAttribute("vertical")&&this.setAttribute("vertical","")}},{key:"attributeChangedCallback",value:function(){var t=Boolean(this.selected);this.setAttribute("tabindex",t?0:-1)}},{key:"show",value:function(){this.parentNode._selectTab(this)}},{key:"selected",set:function(t){t=Boolean(t),this.setAttribute("aria-selected",t)},get:function(){return"true"===this.getAttribute("aria-selected")}}]),e}();window.customElements.define(m.is,m);var y=document.createElement("template");y.innerHTML="\n  <style>\n    :host {\n  display: block; }\n\n:host([hidden]) {\n  display: none; }\n\n  </style>\n  <slot></slot>\n";var T=function(t){function e(){return n(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e.is,y))}return s(e,r.default),c(e,null,[{key:"is",get:function(){return"rh-tab-panel"}}]),c(e,[{key:"connectedCallback",value:function(){i(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"connectedCallback",this).call(this),this.setAttribute("role","tabpanel"),this.setAttribute("tabindex",0),this.id||(this.id=e.is+"-"+u())}}]),e}();window.customElements.define(T.is,T)});