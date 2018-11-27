!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("../rhelement/rhelement.umd.js")):"function"==typeof define&&define.amd?define(["../rhelement/rhelement.umd.js"],e):t.RhAutocomplete=e(t.RHElement)}(this,function(n){"use strict";n=n&&n.hasOwnProperty("default")?n.default:n;var o=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},r=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}(),s=function t(e,n,i){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,n,i)}if("value"in o)return o.value;var s=o.get;return void 0!==s?s.call(i):void 0},a=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},c=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},l=13,u=40,h=38,d=27,e=!1,t=function(t){function e(){return o(this,e),c(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,e))}return a(e,n),r(e,[{key:"html",get:function(){return'\n<style>\n:host {\n  display: block; }\n</style>\n<rh-search-box id="input-box"></rh-search-box>\n<rh-search-droplist id="dropdown"></rh-search-droplist>'}},{key:"templateUrl",get:function(){return"rh-autocomplete.html"}},{key:"styleUrl",get:function(){return"rh-autocomplete.scss"}}],[{key:"tag",get:function(){return"rh-autocomplete"}}]),r(e,[{key:"connectedCallback",value:function(){s(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"connectedCallback",this).call(this),this._inputBox=this.shadowRoot.querySelector("#input-box"),this._inputBox.value=this.initValue,this._inputBox.debounce=this.debounce||500,this._dropdown=this.shadowRoot.querySelector("#dropdown"),this._dropdown.data=[],this.addEventListener("rh-input-change-event",this._autocomplete.bind(this)),this.addEventListener("rh-input-blur",this._closeDroplist.bind(this)),this.addEventListener("keyup",this._inputKeyUp.bind(this)),this.addEventListener("rh-search-event",this._closeDroplist.bind(this)),this.addEventListener("rh-option-selected",this._optionSelected.bind(this))}},{key:"disconnectedCallback",value:function(){this.removeEventListener("rh-input-change-event",this._autocomplete.bind(this)),this.removeEventListener("rh-input-blur",this._closeDroplist.bind(this)),this.removeEventListener("keyup",this._inputKeyUp.bind(this)),this.removeEventListener("rh-search-event",this._closeDroplist),this.removeEventListener("rh-option-selected",this._optionSelected.bind(this))}},{key:"_closeDroplist",value:function(){this._dropdown.open=null,this._dropdown.removeAttribute("active-index"),this._inputBox.removeAttribute("active-index")}},{key:"_openDroplist",value:function(){this._dropdown.setAttribute("open",!0),this._dropdown.setAttribute("active-index",0),this._inputBox.setAttribute("active-index",0),console.log("hello")}},{key:"_optionSelected",value:function(t){var e=t.detail.optionValue;this._reset(e),this._dispatchSearchEvent(e)}},{key:"_dispatchSearchEvent",value:function(t){this.dispatchEvent(new CustomEvent("rh-search-event",{detail:{searchValue:t},bubbles:!0,composed:!0}))}},{key:"_autocomplete",value:function(t){var e=t.detail.inputValue;this._sendAutocompleteRequest(e)}},{key:"_sendAutocompleteRequest",value:function(t){this.autocompleteRequest({query:t},this._autocompleteCallback.bind(this))}},{key:"_autocompleteCallback",value:function(t){this._dropdown.data=t,this._dropdown.reflow=!0,0!==t.length?this._openDroplist():this._closeDroplist()}},{key:"_reset",value:function(t){this._inputBox.value=t,this._dropdown.activeIndex=null,this._dropdown.data=[],this._closeDroplist()}},{key:"_inputKeyUp",value:function(t){var e=t.keyCode;if(0!==this._dropdown.data.length||e===u||e===h||e===l||e===d){var n=parseInt(this._dropdown.activeIndex,10)||null,i=(this._dropdown.selectedOption,this._dropdown.data.length);if(e==d)this._closeDroplist();else if(e===h)(n-=1)<0&&(n=i-1);else if(e===u)i-1<(n+=1)&&(n=0);else if(e===l){var o=void 0;return n?(o=this._dropdown.getAttribute("selected-option"),this._reset(o)):o=this._inputBox.value,void this._dispatchSearchEvent(o)}this._dropdown.activeIndex=n,this._inputBox.activeIndex=n}}},{key:"initValue",get:function(){return this.getAttribute("init-value")},set:function(t){this.setAttribute("init-value",t)}},{key:"debounce",get:function(){return this.getAttribute("debounce")},set:function(t){this.setAttribute("debounce",t)}}]),e}(),i=function(t){function i(){return o(this,i),c(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,i))}return a(i,n),r(i,[{key:"html",get:function(){return'\n<style>\n:host {\n  position: relative;\n  display: flex; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\ninput {\n  width: 100%;\n  flex: 1;\n  box-shadow: inset 0 1px 0px rgba(0, 0, 0, 0.075) !important;\n  padding-left: 5px;\n  border-radius: 0;\n  background: #fff;\n  border: 1px solid #d1d1d1;\n  border-right: none;\n  font-size: 16px;\n  \n  line-height: 24px;\n  \n  height: 35px;\n  margin: 0px;\n  transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s; }\n\ninput:focus,\ninput:focus ~ button.search-button {\n  border-color: #66afe9;\n  outline: 0; }\n\ninput[type="search"],\nbutton {\n  -webkit-appearance: none; }\n\ninput[type="search"]::-ms-clear {\n  display: none; }\n\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nbutton.clear-search {\n  font-size: 27px;\n  color: #cccccc;\n  background-color: #fff;\n  font-weight: 600;\n  border: none;\n  line-height: 20px;\n  position: absolute;\n  right: 50px;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  padding: 0px;\n  margin: 0px; }\n\nbutton.clear-search:hover {\n  opacity: 1;\n  color: #06c; }\n\nbutton.search-button {\n  box-shadow: inset 0 1px 0px rgba(0, 0, 0, 0.075);\n  background-color: #fff;\n  border-color: #0076e0;\n  color: var(--rh-theme--color--ui-link, #06c);\n  border: 1px solid var(--rh-theme--color--surface--border--lightest, #ececec);\n  border-left: none;\n  margin: 0px;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; }\n\nbutton[disabled="true"] {\n  color: #ccc; }\n</style>\n<input placeholder="Enter Your Search Term"\n  role="combobox"\n  aria-label="Search"\n  aria-autocomplete="both"\n  aria-haspopup="true"\n  type="search"\n  autocomplete="off"\n  autocorrect="off"\n  autocapitalize="off"\n  spellcheck="false"\n  class="form-control"/>\n<button type="button" class="clear-search" aria-label="clear search query">\n  &times;\n</button>\n<button class="search-button" type="button" aria-label="Search">\n    <span class="web-icon-search" aria-hidden="true" title="Search">Search</span>\n</button>'}},{key:"templateUrl",get:function(){return"rh-search-box.html"}},{key:"styleUrl",get:function(){return"rh-search-box.scss"}}],[{key:"tag",get:function(){return"rh-search-box"}}]),r(i,[{key:"connectedCallback",value:function(){s(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"connectedCallback",this).call(this),this._input=this.shadowRoot.querySelector("input"),this._input.addEventListener("input",this._inputChanged.bind(this)),this._input.addEventListener("blur",this._inputBlured.bind(this)),this._clearBtn=this.shadowRoot.querySelector(".clear-search"),this._clearBtn.addEventListener("click",this._clear.bind(this)),this._searchBtn=this.shadowRoot.querySelector(".search-button"),this._searchBtn.addEventListener("click",this._search.bind(this))}},{key:"disconnectedCallback",value:function(){this._input.removeEventListener("input",this._inputChanged),this._input.removeEventListener("blur",this._inputBlured),this._clearBtn.removeEventListener("click",this._clear),this._searchBtn.removeEventListener("click",this._search)}},{key:"attributeChangedCallback",value:function(t,e,n){s(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"attributeChangedCallback",this).call(this),"value"===t&&(""===(this._input.value=n)?this._searchBtn.setAttribute("disabled",!0):(this._searchBtn.removeAttribute("disabled"),this._clearBtn.removeAttribute("hidden"))),"active-index"===t&&(n?this._input.setAttribute("aria-activedescendant","option-"+n):this._input.setAttribute("aria-activedescendant",""))}},{key:"_inputBlured",value:function(){this.dispatchEvent(new CustomEvent("rh-input-blur",{bubbles:!0,composed:!0}))}},{key:"_inputChanged",value:function(){var t=this;this.value=this._input.value,!1===e&&(e=!0,window.setTimeout(function(){t.dispatchEvent(new CustomEvent("rh-input-change-event",{detail:{inputValue:t._input.value},bubbles:!0,composed:!0})),e=!1},parseInt(this.debounce,10)||500))}},{key:"_clear",value:function(){this._input.value="",this._clearBtn.setAttribute("hidden",!0),this._searchBtn.setAttribute("disabled",!0),this._input.focus()}},{key:"_search",value:function(t){this.dispatchEvent(new CustomEvent("rh-search-event",{detail:{searchValue:this._input.value},bubbles:!0,composed:!0}))}},{key:"value",get:function(){return this.getAttribute("value")},set:function(t){this.setAttribute("value",t)}},{key:"activeIndex",get:function(){return parseInt(this.getAttribute("active-index"),10)},set:function(t){this.setAttribute("active-index",t)}},{key:"debounce",get:function(){return this.getAttribute("debounce")},set:function(t){this.setAttribute("debounce",t)}}],[{key:"observedAttributes",get:function(){return["value","active-index"]}}]),i}(),p=function(t){function i(){return o(this,i),c(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,i))}return a(i,n),r(i,[{key:"html",get:function(){return'\n<style>\n:host {\n  position: relative;\n  display: none;\n  font-family: var(--rh-theme--font-family);\n  font-size: var(--rh-theme--font-size);\n  line-height: var(--rh-theme--line-height); }\n\n:host([open]) {\n  display: block; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.droplist {\n  display: block;\n  position: absolute;\n  top: 100%;\n  left: 0px;\n  right: 0px;\n  z-index: 9999;\n  overflow-y: scroll;\n  overflow-x: hidden; }\n\ninput {\n  font-family: var(--rh-theme--font-family);\n  font-size: var(--rh-theme--font-size);\n  line-height: var(--rh-theme--line-height); }\n\nul {\n  font-family: var(--rh-theme--font-family);\n  font-size: var(--rh-theme--font-size);\n  line-height: var(--rh-theme--line-height);\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border-top: none;\n  margin: 0px;\n  padding: 0px;\n  list-style: none;\n  cursor: pointer; }\n  ul li {\n    display: list-item;\n    cursor: pointer;\n    padding: 7px 10px;\n    margin: 2px 0px 2px 0px; }\n    ul li.active {\n      background-color: var(--rh-theme--color--surface--lighter, #ececec); }\n</style>\n<div class="suggestions-aria-help sr-only" aria-hidden="false" role="status"></div>\n<div class="droplist">\n  <ul role="listbox" tabindex="-1" id="results">\n  </ul>\n</div>'}},{key:"templateUrl",get:function(){return"rh-search-droplist.html"}},{key:"styleUrl",get:function(){return"rh-search-droplist.scss"}}],[{key:"tag",get:function(){return"rh-search-droplist"}}]),r(i,[{key:"connectedCallback",value:function(){s(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"connectedCallback",this).call(this),this._ariaAnnounce=this.shadowRoot.querySelector(".suggestions-aria-help"),this._ul=this.shadowRoot.querySelector("ul"),this._ul.addEventListener("mousedown",this._optionSelected.bind(this))}},{key:"disconnectedCallback",value:function(){this._ul.removeEventListener("mousedown",this._optionSelected)}},{key:"_optionSelected",value:function(t){"LI"===t.target.tagName&&this.dispatchEvent(new CustomEvent("rh-option-selected",{detail:{optionValue:t.target.innerText},bubbles:!0,composed:!0}))}},{key:"_renderOptions",value:function(){this.reflow="";var t=this.data;this._ariaAnnounce.innerHTML="There are "+t.length+" suggestions. Use the up and down arrows to browse.",this._ariaAnnounce.setAttribute("aria-live","polite"),this._ul.innerHTML=""+t.map(function(t,e){return'<li id="option-'+e+'" class="'+(0===e?"active":"")+'" role="option" tabindex="-1" value="'+t+'">'+t+"</li>"}).join("")}},{key:"attributeChangedCallback",value:function(t,e,n){s(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"attributeChangedCallback",this).call(this),this[name]!==n&&(this[name]=n),"active-index"===t&&e!==n&&this._activeIndexChanged(),"reflow"===t&&this._renderOptions()}},{key:"_activeIndexChanged",value:function(){if(!isNaN(this.activeIndex)&&0!==this.data.length){this._ul.querySelector(".active").classList.remove("active");var t=this._ul.querySelector("li:nth-child("+(this.activeIndex+1)+")");this.selectedOption=t.innerHTML,t.classList.add("active")}}},{key:"open",get:function(){return this.shadowRoot.hasAttribute("open")},set:function(t){(t=Boolean(t))?this.setAttribute("open",""):this.removeAttribute("open")}},{key:"activeIndex",get:function(){return parseInt(this.getAttribute("active-index"),10)},set:function(t){this.setAttribute("active-index",t)}},{key:"selectedOption",get:function(){this.getAttribute("selected-option")},set:function(t){this.setAttribute("selected-option",t)}},{key:"reflow",get:function(){return this.hasAttribute("reflow")},set:function(t){(t=Boolean(t))?this.setAttribute("reflow",""):this.removeAttribute("reflow")}}],[{key:"observedAttributes",get:function(){return["open","reflow","active-index","selected-option"]}}]),i}();return n.create(i),n.create(p),n.create(t),t});
//# sourceMappingURL=rh-autocomplete.umd.js.map
