let t=()=>null;function e(){t("[reveal] web components ready"),t("[reveal] elements ready, revealing the body"),window.document.body.removeAttribute("unresolved")}const s="pfe-";class o extends HTMLElement{static create(t){window.customElements.define(t.tag,t)}static debugLog(t=null){return null!==t&&(o._debugLog=!!t),o._debugLog}static log(...t){o.debugLog()&&console.log(...t)}static get PfeTypes(){return{Container:"container",Content:"content",Combo:"combo"}}get pfeType(){return this.getAttribute(`${s}type`)}set pfeType(t){this.setAttribute(`${s}type`,t)}has_slot(t){return this.querySelector(`[slot='${t}']`)}has_slot(t){return this.querySelector(`[slot='${t}']`)}constructor(t,{type:e=null,delayRender:s=!1}={}){super(),this._pfeClass=t,this.tag=t.tag,this.props=t.properties,this._queue=[],this.template=document.createElement("template"),this.attachShadow({mode:"open"}),e&&this._queueAction({type:"setProperty",data:{name:"pfeType",value:e}}),s||this.render()}connectedCallback(){window.ShadyCSS&&window.ShadyCSS.styleElement(this),this.classList.add("PFElement"),"object"==typeof this.props&&this._mapSchemaToProperties(this.tag,this.props),this._queue.length&&this._processQueue()}attributeChangedCallback(t,e,s){if(!this._pfeClass.cascadingAttributes)return;const o=this._pfeClass.cascadingAttributes[t];o&&this._copyAttribute(t,o)}_copyAttribute(t,e){const s=[...this.querySelectorAll(e),...this.shadowRoot.querySelectorAll(e)],o=this.getAttribute(t),i=null==o?"removeAttribute":"setAttribute";for(const e of s)e[i](t,o)}_mapSchemaToProperties(t,e){Object.keys(e).forEach(o=>{let i=e[o];if(this[o]=i,this[o].value=null,this.hasAttribute(`${s}${o}`))this[o].value=this.getAttribute(`${s}${o}`);else if(i.default){const e=this._hasDependency(t,i.options),n=!i.options||i.options&&!i.options.dependencies.length;(e||n)&&(this.setAttribute(`${s}${o}`,i.default),this[o].value=i.default)}})}_hasDependency(t,e){let o=e?e.dependencies:[],i=!1;for(let e=0;e<o.length;e+=1){const n="slot"===o[e].type&&this.has_slot(`${t}--${o[e].id}`),a="attribute"===o[e].type&&this.getAttribute(`${s}${o[e].id}`);if(n||a){i=!0;break}}return i}_queueAction(t){this._queue.push(t)}_processQueue(){this._queue.forEach(t=>{this[`_${t.type}`](t.data)}),this._queue=[]}_setProperty({name:t,value:e}){this[t]=e}render(){this.shadowRoot.innerHTML="",this.template.innerHTML=this.html,window.ShadyCSS&&window.ShadyCSS.prepareTemplate(this.template,this.tag),this.shadowRoot.appendChild(this.template.content.cloneNode(!0))}log(...t){o.log(`[${this.tag}]`,...t)}}!function(s){t=s;const o=window.WebComponents,i=o&&window.WebComponents.ready;!o||i?e():window.addEventListener("WebComponentsReady",e)}(o.log);export default o;
//# sourceMappingURL=pfelement.js.map
