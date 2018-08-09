!(function(e, t) {
  if ("function" == typeof define && define.amd)
    define("RHElement", ["exports"], t);
  else if ("undefined" != typeof exports) t(exports);
  else {
    var n = {};
    t(n), (e.RHElement = n);
  }
})(this, function(e) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });
  var t = (function() {
    function o(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    return function(e, t, n) {
      return t && o(e.prototype, t), n && o(e, n), e;
    };
  })();
  var n = (function(e) {
    function o(e, t) {
      !(function(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      })(this, o);
      var n = (function(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      })(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this));
      return (
        (n.tag = e),
        (n._queue = []),
        (n.template = document.createElement("template")),
        (n.template.innerHTML = n.html),
        window.ShadyCSS &&
          n.html &&
          ShadyCSS.prepareTemplate(n.template, n.tag),
        n.attachShadow({ mode: "open" }),
        n.html && n.shadowRoot.appendChild(n.template.content.cloneNode(!0)),
        t &&
          n._queueAction({
            type: "setProperty",
            data: { name: "rhType", value: t }
          }),
        n
      );
    }
    return (
      (function(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      })(o, HTMLElement),
      t(
        o,
        [
          {
            key: "rhType",
            get: function() {
              return this.getAttribute("rh-type");
            },
            set: function(e) {
              this.setAttribute("rh-type", e);
            }
          }
        ],
        [
          {
            key: "create",
            value: function(e) {
              window.customElements.define(e.tag, e);
            }
          },
          {
            key: "RhTypes",
            get: function() {
              return {
                Container: "container",
                Content: "content",
                Pattern: "pattern"
              };
            }
          }
        ]
      ),
      t(o, [
        {
          key: "connectedCallback",
          value: function() {
            window.ShadyCSS && ShadyCSS.styleElement(this),
              this._queue.length && this._processQueue();
          }
        },
        {
          key: "_queueAction",
          value: function(e) {
            this._queue.push(e);
          }
        },
        {
          key: "_processQueue",
          value: function() {
            var t = this;
            this._queue.forEach(function(e) {
              t["_" + e.type](e.data);
            }),
              (this._queue = []);
          }
        },
        {
          key: "_setProperty",
          value: function(e) {
            var t = e.name,
              n = e.value;
            this[t] = n;
          }
        }
      ]),
      o
    );
  })();
  e.default = n;
});
