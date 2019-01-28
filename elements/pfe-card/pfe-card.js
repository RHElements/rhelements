import PFElement from "../pfelement/pfelement.js";

/*
 * Copyright 2019 Red Hat, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/

// -- Polyfill for supporting Element.closest
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// -- Polyfill for supporting Array.includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    value: function(valueToFind, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return (
          x === y ||
          (typeof x === "number" &&
            typeof y === "number" &&
            isNaN(x) &&
            isNaN(y))
        );
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(valueToFind, elementK) is true, return true.
        if (sameValueZero(o[k], valueToFind)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

class PfeCard extends PFElement {
  get html() {
    return `<style>:host {
  --pfe-card--PaddingTop: calc(var(--pfe-theme--container-spacer, 1rem) * 2);
  --pfe-card--PaddingRight: calc(var(--pfe-theme--container-spacer, 1rem) * 2);
  --pfe-card--PaddingBottom: calc(var(--pfe-theme--container-spacer, 1rem) * 2);
  --pfe-card--PaddingLeft: calc(var(--pfe-theme--container-spacer, 1rem) * 2);
  --pfe-card--Padding: var(--pfe-card--PaddingTop) var(--pfe-card--PaddingRight) var(--pfe-card--PaddingBottom) var(--pfe-card--PaddingLeft);
  --pfe-card--spacing: var(--pfe-theme--container-spacer, 1rem);
  --pfe-card--BorderWeight: 1px;
  --pfe-card--BorderStyle:  solid;
  --pfe-card--BorderColor:  transparent;
  --pfe-card--BorderRadius: var(--pfe-theme--surface--border-radius, 0);
  --pfe-card--Border: var(--pfe-card--BorderWeight) var(--pfe-card--BorderStyle) var(--pfe-card--BorderColor);
  --pfe-card--BackgroundColor: var(--pfe-theme--color--surface--base, #dfdfdf);
  --pfe-card__header--BackgroundColor: var(--pfe-theme--color--surface--base--harmony, );
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--base--text, #333);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--base--link, #00538c);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--base--link--visited, #7551a6);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--base--link--hover, #00305b);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--base--link--focus, #00305b);
  --pfe-card_header--size:  var(--pfe-theme--font-size--heading--gamma, 21px);
  --pfe-card--padding:      var(--pfe-card--Padding);
  --pfe-card--bg:           var(--pfe-card--BackgroundColor);
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  padding: var(--pfe-card--Padding);
  border: var(--pfe-card--Border);
  border-radius: var(--pfe-card--BorderRadius);
  background-color: var(--pfe-card--BackgroundColor);
  color: var(--pfe-broadcasted--color--text); }

:host([color="darker"]),
:host([pfe-color="darker"]) {
  --pfe-card--BackgroundColor:                  var(--pfe-theme--color--surface--darker, #464646);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darker--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darker--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darker--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darker--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darker--link--focus, #cce6ff);
  --pfe-card__header--BackgroundColor:          var(--pfe-theme--color--surface--darker--harmony, ); }
  :host([color="darker"]) .pfe-card__header,
  :host([pfe-color="darker"]) .pfe-card__header {
    --pfe-broadcasted--color--text:             var(--pfe-theme--color--surface--darker--harmony--text, );
    --pfe-broadcasted--color--ui-link:          var(--pfe-theme--color--surface--darker--harmony--link, );
    --pfe-broadcasted--color--ui-link--visited: var(--pfe-theme--color--surface--darker--harmony--link--visited, );
    --pfe-broadcasted--color--ui-link--hover:   var(--pfe-theme--color--surface--darker--harmony--link--hover, );
    --pfe-broadcasted--color--ui-link--focus:   var(--pfe-theme--color--surface--darker--harmony--link--focus, ); }

:host([color="darker"]),
:host([pfe-color="darker"]) {
  --pfe-card--BackgroundColor:                  var(--pfe-theme--color--surface--darker, #464646);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darker--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darker--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darker--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darker--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darker--link--focus, #cce6ff);
  --pfe-card__header--BackgroundColor:          var(--pfe-theme--color--surface--darker--harmony, ); }
  :host([color="darker"]) .pfe-card__header,
  :host([pfe-color="darker"]) .pfe-card__header {
    --pfe-broadcasted--color--text:             var(--pfe-theme--color--surface--darker--harmony--text, );
    --pfe-broadcasted--color--ui-link:          var(--pfe-theme--color--surface--darker--harmony--link, );
    --pfe-broadcasted--color--ui-link--visited: var(--pfe-theme--color--surface--darker--harmony--link--visited, );
    --pfe-broadcasted--color--ui-link--hover:   var(--pfe-theme--color--surface--darker--harmony--link--hover, );
    --pfe-broadcasted--color--ui-link--focus:   var(--pfe-theme--color--surface--darker--harmony--link--focus, ); }

:host([color="darkest"]),
:host([pfe-color="darkest"]) {
  --pfe-card--BackgroundColor:                  var(--pfe-theme--color--surface--darkest, #131313);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darkest--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darkest--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darkest--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darkest--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darkest--link--focus, #cce6ff);
  --pfe-card__header--BackgroundColor:          var(--pfe-theme--color--surface--darkest--harmony, ); }
  :host([color="darkest"]) .pfe-card__header,
  :host([pfe-color="darkest"]) .pfe-card__header {
    --pfe-broadcasted--color--text:             var(--pfe-theme--color--surface--darkest--harmony--text, );
    --pfe-broadcasted--color--ui-link:          var(--pfe-theme--color--surface--darkest--harmony--link, );
    --pfe-broadcasted--color--ui-link--visited: var(--pfe-theme--color--surface--darkest--harmony--link--visited, );
    --pfe-broadcasted--color--ui-link--hover:   var(--pfe-theme--color--surface--darkest--harmony--link--hover, );
    --pfe-broadcasted--color--ui-link--focus:   var(--pfe-theme--color--surface--darkest--harmony--link--focus, ); }

:host([color="lighter"]),
:host([pfe-color="lighter"]) {
  --pfe-card--BackgroundColor:                  var(--pfe-theme--color--surface--lighter, #ececec);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lighter--text, #333);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lighter--link, #06c);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lighter--link--visited, rebeccapurple);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lighter--link--hover, #003366);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lighter--link--focus, #003366);
  --pfe-card__header--BackgroundColor:          var(--pfe-theme--color--surface--lighter--harmony, ); }
  :host([color="lighter"]) .pfe-card__header,
  :host([pfe-color="lighter"]) .pfe-card__header {
    --pfe-broadcasted--color--text:             var(--pfe-theme--color--surface--lighter--harmony--text, );
    --pfe-broadcasted--color--ui-link:          var(--pfe-theme--color--surface--lighter--harmony--link, );
    --pfe-broadcasted--color--ui-link--visited: var(--pfe-theme--color--surface--lighter--harmony--link--visited, );
    --pfe-broadcasted--color--ui-link--hover:   var(--pfe-theme--color--surface--lighter--harmony--link--hover, );
    --pfe-broadcasted--color--ui-link--focus:   var(--pfe-theme--color--surface--lighter--harmony--link--focus, ); }

:host([color="lighter"]),
:host([pfe-color="lighter"]) {
  --pfe-card--BackgroundColor:                  var(--pfe-theme--color--surface--lighter, #ececec);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lighter--text, #333);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lighter--link, #06c);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lighter--link--visited, rebeccapurple);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lighter--link--hover, #003366);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lighter--link--focus, #003366);
  --pfe-card__header--BackgroundColor:          var(--pfe-theme--color--surface--lighter--harmony, ); }
  :host([color="lighter"]) .pfe-card__header,
  :host([pfe-color="lighter"]) .pfe-card__header {
    --pfe-broadcasted--color--text:             var(--pfe-theme--color--surface--lighter--harmony--text, );
    --pfe-broadcasted--color--ui-link:          var(--pfe-theme--color--surface--lighter--harmony--link, );
    --pfe-broadcasted--color--ui-link--visited: var(--pfe-theme--color--surface--lighter--harmony--link--visited, );
    --pfe-broadcasted--color--ui-link--hover:   var(--pfe-theme--color--surface--lighter--harmony--link--hover, );
    --pfe-broadcasted--color--ui-link--focus:   var(--pfe-theme--color--surface--lighter--harmony--link--focus, ); }

:host([color="lightest"]),
:host([pfe-color="lightest"]) {
  --pfe-card--BackgroundColor:                  var(--pfe-theme--color--surface--lightest, #fff);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lightest--text, #333);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lightest--link, #06c);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lightest--link--visited, rebeccapurple);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lightest--link--hover, #003366);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lightest--link--focus, #003366);
  --pfe-card__header--BackgroundColor:          var(--pfe-theme--color--surface--lightest--harmony, ); }
  :host([color="lightest"]) .pfe-card__header,
  :host([pfe-color="lightest"]) .pfe-card__header {
    --pfe-broadcasted--color--text:             var(--pfe-theme--color--surface--lightest--harmony--text, );
    --pfe-broadcasted--color--ui-link:          var(--pfe-theme--color--surface--lightest--harmony--link, );
    --pfe-broadcasted--color--ui-link--visited: var(--pfe-theme--color--surface--lightest--harmony--link--visited, );
    --pfe-broadcasted--color--ui-link--hover:   var(--pfe-theme--color--surface--lightest--harmony--link--hover, );
    --pfe-broadcasted--color--ui-link--focus:   var(--pfe-theme--color--surface--lightest--harmony--link--focus, ); }

:host([color="complement"]),
:host([pfe-color="complement"]) {
  --pfe-card--BackgroundColor:                  var(--pfe-theme--color--surface--complement, #0477a4);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--complement--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--complement--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--complement--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--complement--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--complement--link--focus, #cce6ff);
  --pfe-card__header--BackgroundColor:          var(--pfe-theme--color--surface--complement--harmony, ); }
  :host([color="complement"]) .pfe-card__header,
  :host([pfe-color="complement"]) .pfe-card__header {
    --pfe-broadcasted--color--text:             var(--pfe-theme--color--surface--complement--harmony--text, );
    --pfe-broadcasted--color--ui-link:          var(--pfe-theme--color--surface--complement--harmony--link, );
    --pfe-broadcasted--color--ui-link--visited: var(--pfe-theme--color--surface--complement--harmony--link--visited, );
    --pfe-broadcasted--color--ui-link--hover:   var(--pfe-theme--color--surface--complement--harmony--link--hover, );
    --pfe-broadcasted--color--ui-link--focus:   var(--pfe-theme--color--surface--complement--harmony--link--focus, ); }

:host([color="accent"]),
:host([pfe-color="accent"]) {
  --pfe-card--BackgroundColor:                  var(--pfe-theme--color--surface--accent, #fe460d);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--accent--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--accent--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--accent--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--accent--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--accent--link--focus, #cce6ff);
  --pfe-card__header--BackgroundColor:          var(--pfe-theme--color--surface--accent--harmony, ); }
  :host([color="accent"]) .pfe-card__header,
  :host([pfe-color="accent"]) .pfe-card__header {
    --pfe-broadcasted--color--text:             var(--pfe-theme--color--surface--accent--harmony--text, );
    --pfe-broadcasted--color--ui-link:          var(--pfe-theme--color--surface--accent--harmony--link, );
    --pfe-broadcasted--color--ui-link--visited: var(--pfe-theme--color--surface--accent--harmony--link--visited, );
    --pfe-broadcasted--color--ui-link--hover:   var(--pfe-theme--color--surface--accent--harmony--link--hover, );
    --pfe-broadcasted--color--ui-link--focus:   var(--pfe-theme--color--surface--accent--harmony--link--focus, ); }

:host([size="small"]),
:host([pfe-size="small"]) {
  --pfe-card--PaddingTop:     var(--pfe-theme--container-spacer, 1rem);
  --pfe-card--PaddingRight:   var(--pfe-theme--container-spacer, 1rem);
  --pfe-card--PaddingBottom:  var(--pfe-theme--container-spacer, 1rem);
  --pfe-card--PaddingLeft:    var(--pfe-theme--container-spacer, 1rem); }

::slotted(p) {
  margin-top: 0 !important; }

::slotted(h1) {
  margin-top: 0 !important; }

::slotted(h2) {
  margin-top: 0 !important; }

::slotted(h3) {
  margin-top: 0 !important; }

::slotted(h4) {
  margin-top: 0 !important; }

::slotted(h5) {
  margin-top: 0 !important; }

::slotted(h6) {
  margin-top: 0 !important; }

.pfe-card__header, .pfe-card__body, .pfe-card__footer {
  display: block; }
  .pfe-card__header:not(:last-child), .pfe-card__body:not(:last-child), .pfe-card__footer:not(:last-child) {
    margin-bottom: var(--pfe-card--spacing); }

.pfe-card__header {
  --pfe-broadcasted--color--text:             var(--pfe-theme--color--surface--base--harmony--text, );
  --pfe-broadcasted--color--ui-link:          var(--pfe-theme--color--surface--base--harmony--link, );
  --pfe-broadcasted--color--ui-link--visited: var(--pfe-theme--color--surface--base--harmony--link--visited, );
  --pfe-broadcasted--color--ui-link--hover:   var(--pfe-theme--color--surface--base--harmony--link--hover, );
  --pfe-broadcasted--color--ui-link--focus:   var(--pfe-theme--color--surface--base--harmony--link--focus, );
  background-color: var(--pfe-card__header--BackgroundColor);
  margin-top: calc(-1 * var(--pfe-card--PaddingTop));
  margin-right: calc(-1 * var(--pfe-card--PaddingRight));
  margin-left: calc(-1 * var(--pfe-card--PaddingLeft));
  padding-top: var(--pfe-card--spacing);
  padding-right: var(--pfe-card--PaddingRight);
  padding-left: var(--pfe-card--PaddingLeft); }

.pfe-card__footer {
  margin-top: auto;
  justify-self: flex-end; }</style>
<slot class="pfe-card__header" name="pfe-card--header"></slot>
<slot class="pfe-card__body"></slot>
<slot class="pfe-card__footer" name="pfe-card--footer"></slot>`;
  }

  static get tag() {
    return "pfe-card";
  }

  get schemaUrl() {
    return "pfe-band.json";
  }

  get styleUrl() {
    return "pfe-card.scss";
  }

  get templateUrl() {
    return "pfe-card.html";
  }

  get imageSrc() {
    return this.getAttribute("pfe-img-src");
  }

  get backgroundColor() {
    return (
      this.getAttribute("pfe-color") || this.getAttribute("color") || "base"
    );
  }

  static get observedAttributes() {
    return ["pfe-color", "pfe-img-src", "pfe-size"];
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeCard, { type: PfeCard.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // Initialize the background image attachment
    if (this.imageSrc) {
      this._imgSrcChanged("pfe-img-src", "", this.imageSrc);
    }
    // Initialize the context setting for the children elements
    if (this.backgroundColor) {
      this._updateContext(this.backgroundColor);
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix from the attribute
    attr = attr.replace("pfe-", "");
    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }
  }

  _basicAttributeChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
  }

  // Update the color attribute and contexts
  _colorChanged(attr, oldValue, newValue) {
    // If the new value has a dark background, update children elements
    this._updateContext(newValue);
  }

  // Update the background image
  _imgSrcChanged(attr, oldValue, newValue) {
    // Set the image as the background image
    this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
  }

  // Set the children's context if parent background is dark
  _updateContext(context) {
    if (
      ["darkest", "darker", "dark", "complement", "accent"].includes(context)
    ) {
      ["pfe-cta"].forEach(elementName => {
        const els = [...this.querySelectorAll(`${elementName}`)];
        els.forEach(el => {
          const myContainer = el.closest("[pfe-type=container]");
          if (myContainer === this || myContainer === null) {
            el.setAttribute("on", "dark");
          }
        });
      });
    }
  }
}

PFElement.create(PfeCard);

export default PfeCard;
//# sourceMappingURL=pfe-card.js.map
