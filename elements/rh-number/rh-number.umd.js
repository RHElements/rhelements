!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("../rhelement/rhelement.umd.js")):"function"==typeof define&&define.amd?define(["../rhelement/rhelement.umd.js"],t):t(e.RHElement)}(this,function(r){"use strict";r=r&&r.hasOwnProperty("default")?r.default:r;var n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var e,o=(function(e){var t,r;t=n,r=function(){var y,i,l,s,e,u={},_={},t={currentLocale:"en",zeroFormat:null,nullFormat:null,defaultFormat:"0,0",scalePercentBy100:!0},c={currentLocale:t.currentLocale,zeroFormat:t.zeroFormat,nullFormat:t.nullFormat,defaultFormat:t.defaultFormat,scalePercentBy100:t.scalePercentBy100};function a(e,t){this._input=e,this._value=t}return(y=function(e){var t,r,n,o;if(y.isNumeral(e))t=e.value();else if(0===e||void 0===e)t=0;else if(null===e||i.isNaN(e))t=null;else if("string"==typeof e)if(c.zeroFormat&&e===c.zeroFormat)t=0;else if(c.nullFormat&&e===c.nullFormat||!e.replace(/[^0-9]+/g,"").length)t=null;else{for(r in u)if((o="function"==typeof u[r].regexps.unformat?u[r].regexps.unformat():u[r].regexps.unformat)&&e.match(o)){n=u[r].unformat;break}t=(n=n||y._.stringToNumber)(e)}else t=Number(e)||null;return new a(e,t)}).version="2.0.6",y.isNumeral=function(e){return e instanceof a},y._=i={numberToFormat:function(e,t,r){var n,o,i,a,u,l,s,c,f=_[y.options.currentLocale],m=!1,b=!1,h="",p=1e12,d="",g=!1;if(e=e||0,i=Math.abs(e),y._.includes(t,"(")?(m=!0,t=t.replace(/[\(|\)]/g,"")):(y._.includes(t,"+")||y._.includes(t,"-"))&&(l=y._.includes(t,"+")?t.indexOf("+"):e<0?t.indexOf("-"):-1,t=t.replace(/[\+|\-]/g,"")),y._.includes(t,"a")&&(o=!!(o=t.match(/a(k|m|b|t)?/))&&o[1],y._.includes(t," a")&&(h=" "),t=t.replace(new RegExp(h+"a[kmbt]?"),""),p<=i&&!o||"t"===o?(h+=f.abbreviations.trillion,e/=p):i<p&&1e9<=i&&!o||"b"===o?(h+=f.abbreviations.billion,e/=1e9):i<1e9&&1e6<=i&&!o||"m"===o?(h+=f.abbreviations.million,e/=1e6):(i<1e6&&1e3<=i&&!o||"k"===o)&&(h+=f.abbreviations.thousand,e/=1e3)),y._.includes(t,"[.]")&&(b=!0,t=t.replace("[.]",".")),a=e.toString().split(".")[0],u=t.split(".")[1],s=t.indexOf(","),n=(t.split(".")[0].split(",")[0].match(/0/g)||[]).length,u?(y._.includes(u,"[")?(u=(u=u.replace("]","")).split("["),d=y._.toFixed(e,u[0].length+u[1].length,r,u[1].length)):d=y._.toFixed(e,u.length,r),a=d.split(".")[0],d=y._.includes(d,".")?f.delimiters.decimal+d.split(".")[1]:"",b&&0===Number(d.slice(1))&&(d="")):a=y._.toFixed(e,0,r),h&&!o&&1e3<=Number(a)&&h!==f.abbreviations.trillion)switch(a=String(Number(a)/1e3),h){case f.abbreviations.thousand:h=f.abbreviations.million;break;case f.abbreviations.million:h=f.abbreviations.billion;break;case f.abbreviations.billion:h=f.abbreviations.trillion}if(y._.includes(a,"-")&&(a=a.slice(1),g=!0),a.length<n)for(var v=n-a.length;0<v;v--)a="0"+a;return-1<s&&(a=a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+f.delimiters.thousands)),0===t.indexOf(".")&&(a=""),c=a+d+(h||""),m?c=(m&&g?"(":"")+c+(m&&g?")":""):0<=l?c=0===l?(g?"-":"+")+c:c+(g?"-":"+"):g&&(c="-"+c),c},stringToNumber:function(e){var t,r,n,o=_[c.currentLocale],i=e,a={thousand:3,million:6,billion:9,trillion:12};if(c.zeroFormat&&e===c.zeroFormat)r=0;else if(c.nullFormat&&e===c.nullFormat||!e.replace(/[^0-9]+/g,"").length)r=null;else{for(t in r=1,"."!==o.delimiters.decimal&&(e=e.replace(/\./g,"").replace(o.delimiters.decimal,".")),a)if(n=new RegExp("[^a-zA-Z]"+o.abbreviations[t]+"(?:\\)|(\\"+o.currency.symbol+")?(?:\\))?)?$"),i.match(n)){r*=Math.pow(10,a[t]);break}r*=(e.split("-").length+Math.min(e.split("(").length-1,e.split(")").length-1))%2?1:-1,e=e.replace(/[^0-9\.]+/g,""),r*=Number(e)}return r},isNaN:function(e){return"number"==typeof e&&isNaN(e)},includes:function(e,t){return-1!==e.indexOf(t)},insert:function(e,t,r){return e.slice(0,r)+t+e.slice(r)},reduce:function(e,t){if(null===this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof t)throw new TypeError(t+" is not a function");var r,n=Object(e),o=n.length>>>0,i=0;if(3===arguments.length)r=arguments[2];else{for(;i<o&&!(i in n);)i++;if(o<=i)throw new TypeError("Reduce of empty array with no initial value");r=n[i++]}for(;i<o;i++)i in n&&(r=t(r,n[i],i,n));return r},multiplier:function(e){var t=e.toString().split(".");return t.length<2?1:Math.pow(10,t[1].length)},correctionFactor:function(){return Array.prototype.slice.call(arguments).reduce(function(e,t){var r=i.multiplier(t);return r<e?e:r},1)},toFixed:function(e,t,r,n){var o,i,a,u,l=e.toString().split("."),s=t-(n||0);return o=2===l.length?Math.min(Math.max(l[1].length,s),t):s,a=Math.pow(10,o),u=(r(e+"e+"+o)/a).toFixed(o),t-o<n&&(i=new RegExp("\\.?0{1,"+(n-(t-o))+"}$"),u=u.replace(i,"")),u}},y.options=c,y.formats=u,y.locales=_,y.locale=function(e){return e&&(c.currentLocale=e.toLowerCase()),c.currentLocale},y.localeData=function(e){if(!e)return _[c.currentLocale];if(e=e.toLowerCase(),!_[e])throw new Error("Unknown locale : "+e);return _[e]},y.reset=function(){for(var e in t)c[e]=t[e]},y.zeroFormat=function(e){c.zeroFormat="string"==typeof e?e:null},y.nullFormat=function(e){c.nullFormat="string"==typeof e?e:null},y.defaultFormat=function(e){c.defaultFormat="string"==typeof e?e:"0.0"},y.register=function(e,t,r){if(t=t.toLowerCase(),this[e+"s"][t])throw new TypeError(t+" "+e+" already registered.");return this[e+"s"][t]=r},y.validate=function(e,t){var r,n,o,i,a,u,l,s;if("string"!=typeof e&&(e+="",console.warn&&console.warn("Numeral.js: Value is not string. It has been co-erced to: ",e)),(e=e.trim()).match(/^\d+$/))return!0;if(""===e)return!1;try{l=y.localeData(t)}catch(e){l=y.localeData(y.locale())}return o=l.currency.symbol,a=l.abbreviations,r=l.delimiters.decimal,n="."===l.delimiters.thousands?"\\.":l.delimiters.thousands,(null===(s=e.match(/^[^\d]+/))||(e=e.substr(1),s[0]===o))&&((null===(s=e.match(/[^\d]+$/))||(e=e.slice(0,-1),s[0]===a.thousand||s[0]===a.million||s[0]===a.billion||s[0]===a.trillion))&&(u=new RegExp(n+"{2}"),!e.match(/[^\d.,]/g)&&(!(2<(i=e.split(r)).length)&&(i.length<2?!!i[0].match(/^\d+.*\d$/)&&!i[0].match(u):1===i[0].length?!!i[0].match(/^\d+$/)&&!i[0].match(u)&&!!i[1].match(/^\d+$/):!!i[0].match(/^\d+.*\d$/)&&!i[0].match(u)&&!!i[1].match(/^\d+$/)))))},y.fn=a.prototype={clone:function(){return y(this)},format:function(e,t){var r,n,o,i=this._value,a=e||c.defaultFormat;if(t=t||Math.round,0===i&&null!==c.zeroFormat)n=c.zeroFormat;else if(null===i&&null!==c.nullFormat)n=c.nullFormat;else{for(r in u)if(a.match(u[r].regexps.format)){o=u[r].format;break}n=(o=o||y._.numberToFormat)(i,a,t)}return n},value:function(){return this._value},input:function(){return this._input},set:function(e){return this._value=Number(e),this},add:function(e){var o=i.correctionFactor.call(null,this._value,e);return this._value=i.reduce([this._value,e],function(e,t,r,n){return e+Math.round(o*t)},0)/o,this},subtract:function(e){var o=i.correctionFactor.call(null,this._value,e);return this._value=i.reduce([e],function(e,t,r,n){return e-Math.round(o*t)},Math.round(this._value*o))/o,this},multiply:function(e){return this._value=i.reduce([this._value,e],function(e,t,r,n){var o=i.correctionFactor(e,t);return Math.round(e*o)*Math.round(t*o)/Math.round(o*o)},1),this},divide:function(e){return this._value=i.reduce([this._value,e],function(e,t,r,n){var o=i.correctionFactor(e,t);return Math.round(e*o)/Math.round(t*o)}),this},difference:function(e){return Math.abs(y(this._value).subtract(e).value())}},y.register("locale","en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(e){var t=e%10;return 1==~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th"},currency:{symbol:"$"}}),y.register("format","bps",{regexps:{format:/(BPS)/,unformat:/(BPS)/},format:function(e,t,r){var n,o=y._.includes(t," BPS")?" ":"";return e*=1e4,t=t.replace(/\s?BPS/,""),n=y._.numberToFormat(e,t,r),y._.includes(n,")")?((n=n.split("")).splice(-1,0,o+"BPS"),n=n.join("")):n=n+o+"BPS",n},unformat:function(e){return+(1e-4*y._.stringToNumber(e)).toFixed(15)}}),s={base:1024,suffixes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},e="("+(e=(l={base:1e3,suffixes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}).suffixes.concat(s.suffixes.filter(function(e){return l.suffixes.indexOf(e)<0})).join("|")).replace("B","B(?!PS)")+")",y.register("format","bytes",{regexps:{format:/([0\s]i?b)/,unformat:new RegExp(e)},format:function(e,t,r){var n,o,i,a=y._.includes(t,"ib")?s:l,u=y._.includes(t," b")||y._.includes(t," ib")?" ":"";for(t=t.replace(/\s?i?b/,""),n=0;n<=a.suffixes.length;n++)if(o=Math.pow(a.base,n),i=Math.pow(a.base,n+1),null===e||0===e||o<=e&&e<i){u+=a.suffixes[n],0<o&&(e/=o);break}return y._.numberToFormat(e,t,r)+u},unformat:function(e){var t,r,n=y._.stringToNumber(e);if(n){for(t=l.suffixes.length-1;0<=t;t--){if(y._.includes(e,l.suffixes[t])){r=Math.pow(l.base,t);break}if(y._.includes(e,s.suffixes[t])){r=Math.pow(s.base,t);break}}n*=r||1}return n}}),y.register("format","currency",{regexps:{format:/(\$)/},format:function(e,t,r){var n,o,i=y.locales[y.options.currentLocale],a={before:t.match(/^([\+|\-|\(|\s|\$]*)/)[0],after:t.match(/([\+|\-|\)|\s|\$]*)$/)[0]};for(t=t.replace(/\s?\$\s?/,""),n=y._.numberToFormat(e,t,r),0<=e?(a.before=a.before.replace(/[\-\(]/,""),a.after=a.after.replace(/[\-\)]/,"")):e<0&&!y._.includes(a.before,"-")&&!y._.includes(a.before,"(")&&(a.before="-"+a.before),o=0;o<a.before.length;o++)switch(a.before[o]){case"$":n=y._.insert(n,i.currency.symbol,o);break;case" ":n=y._.insert(n," ",o+i.currency.symbol.length-1)}for(o=a.after.length-1;0<=o;o--)switch(a.after[o]){case"$":n=o===a.after.length-1?n+i.currency.symbol:y._.insert(n,i.currency.symbol,-(a.after.length-(1+o)));break;case" ":n=o===a.after.length-1?n+" ":y._.insert(n," ",-(a.after.length-(1+o)+i.currency.symbol.length-1))}return n}}),y.register("format","exponential",{regexps:{format:/(e\+|e-)/,unformat:/(e\+|e-)/},format:function(e,t,r){var n=("number"!=typeof e||y._.isNaN(e)?"0e+0":e.toExponential()).split("e");return t=t.replace(/e[\+|\-]{1}0/,""),y._.numberToFormat(Number(n[0]),t,r)+"e"+n[1]},unformat:function(e){var t=y._.includes(e,"e+")?e.split("e+"):e.split("e-"),r=Number(t[0]),n=Number(t[1]);return n=y._.includes(e,"e-")?n*=-1:n,y._.reduce([r,Math.pow(10,n)],function(e,t,r,n){var o=y._.correctionFactor(e,t);return e*o*(t*o)/(o*o)},1)}}),y.register("format","ordinal",{regexps:{format:/(o)/},format:function(e,t,r){var n=y.locales[y.options.currentLocale],o=y._.includes(t," o")?" ":"";return t=t.replace(/\s?o/,""),o+=n.ordinal(e),y._.numberToFormat(e,t,r)+o}}),y.register("format","percentage",{regexps:{format:/(%)/,unformat:/(%)/},format:function(e,t,r){var n,o=y._.includes(t," %")?" ":"";return y.options.scalePercentBy100&&(e*=100),t=t.replace(/\s?\%/,""),n=y._.numberToFormat(e,t,r),y._.includes(n,")")?((n=n.split("")).splice(-1,0,o+"%"),n=n.join("")):n=n+o+"%",n},unformat:function(e){var t=y._.stringToNumber(e);return y.options.scalePercentBy100?.01*t:t}}),y.register("format","time",{regexps:{format:/(:)/,unformat:/(:)/},format:function(e,t,r){var n=Math.floor(e/60/60),o=Math.floor((e-60*n*60)/60),i=Math.round(e-60*n*60-60*o);return n+":"+(o<10?"0"+o:o)+":"+(i<10?"0"+i:i)},unformat:function(e){var t=e.split(":"),r=0;return 3===t.length?(r+=60*Number(t[0])*60,r+=60*Number(t[1]),r+=Number(t[2])):2===t.length&&(r+=60*Number(t[0]),r+=Number(t[1])),Number(r)}}),y},e.exports?e.exports=r():t.numeral=r()}(e={exports:{}},e.exports),e.exports),i=function(){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),a={abbrev:"0a",ordinal:"0o",percent:"0%",bytes:"0[.][00] ib",e:"0[.00]e+0",thousands:"0,0[.00]"};o.locales.en.delimiters.thousands=" ";var t=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,t.tag))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r),i(t,[{key:"html",get:function(){return"\n<style>\n:host {\n  display: inline;\n  white-space: nowrap; }\n</style>\n<span></span>"}},{key:"styleUrl",get:function(){return"rh-number.scss"}},{key:"templateUrl",get:function(){return"rh-number.html"}}],[{key:"tag",get:function(){return"rh-number"}},{key:"observedAttributes",get:function(){return["number","format","type"]}}]),i(t,[{key:"connectedCallback",value:function(){(function e(t,r,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,r);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,r,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0})(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"connectedCallback",this).call(this),this.connected=!0,this._determineFormat(),this._setInitialNumber()}},{key:"attributeChangedCallback",value:function(e,t,r){switch(e){case"type":this._determineFormat();break;case"format":this._updateNumber(this.getAttribute("number"),r);break;case"number":this._updateNumber(r,this.getAttribute("format"))}}},{key:"_setInitialNumber",value:function(){var e=!Number.isNaN(parseFloat(this.getAttribute("number"))),t=!Number.isNaN(parseFloat(this.textContent));e?this.setAttribute("number",this.getAttribute("number")):t&&this.setAttribute("number",this.textContent)}},{key:"_determineFormat",value:function(){var e=this.getAttribute("type");e&&a[e]?this.setAttribute("format",a[e]):this.setAttribute("format",this.getAttribute("format")||"0")}},{key:"_updateNumber",value:function(e,t){this.shadowRoot.querySelector("span").textContent=this._format(e,t)}},{key:"_format",value:function(e,t){return o(e).format(t)}}]),t}();r.create(t)});
//# sourceMappingURL=rh-number.umd.js.map
