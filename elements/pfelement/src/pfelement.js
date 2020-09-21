import { autoReveal } from "./reveal.js";
import { isAllowedType, isValidDefaultType } from "./attrDefValidators.js";

const prefix = "pfe";

class PFElement extends HTMLElement {
  static create(pfe) {
    pfe._validateProperties();
    window.customElements.define(pfe.tag, pfe);
  }

  /**
   * This prefix is prepended to the name of any attributes defined on the base
   * class.  In other words, attributes that can be used on any element will be
   * prefixed with this string.
   *
   * @example A "context" prop, when reflected as an attribute, prefixed with "pfe-g-": <pfe-foo pfe-g-context="bar">
   */
  static get globalAttrPrefix() {
    return `${prefix}-g-`;
  }

  static get attrPrefix() {
    return `${prefix}-c-`;
  }

  /**
   * allProperties returns an object containing PFElement's global properties
   * and the descendent's (such as PfeCard, etc) component properties.  The two
   * objects are merged together and in the case of a property name conflict,
   * PFElement's properties override the component's properties.
   */
  static get allProperties() {
    // cache/memoize the result of the object merge, to avoid having to merge
    // objects every time properties are referenced.
    if (!this._cachedAllProperties) {
      this._cachedAllProperties = { ...this.properties, ...Object.getPrototypeOf(this).properties };
    }
    return this._cachedAllProperties;
  }

  static debugLog(preference = null) {
    if (preference !== null) {
      PFElement._debugLog = !!preference;
    }
    return PFElement._debugLog;
  }

  static log(...msgs) {
    if (PFElement.debugLog()) {
      console.log(...msgs);
    }
  }

  static get PfeTypes() {
    return {
      Container: "container",
      Content: "content",
      Combo: "combo"
    };
  }

  static get version() {
    return "{{version}}";
  }

  static get properties() {
    return {
      context: {
        title: "Context",
        type: String,
        values: ["light", "dark", "saturated"],
        observer: "context_update"
      },
      oldTheme: {
        title: "Context",
        type: String,
        values: ["light", "dark", "saturated"],
        attr: "pfe-theme"
      },
      type: {
        title: "Component type",
        type: String,
        values: ["container", "content", "combo"]
      },
      oldType: {
        type: String,
        attr: "pfe-type"
      }
    };
  }

  static get observedAttributes() {
    const properties = this.allProperties;
    if (properties) {
      const oa = Object.keys(properties)
        .filter(prop => properties[prop].observer || properties[prop].cascade || properties[prop].alias)
        .map(p => this._prop2attr(p));
      console.log(oa);
      // console.log("observed attributes are", oa);
      return [...oa];
    }
  }

  get randomId() {
    return (
      `${prefix}-` +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  get version() {
    return this._pfeClass.version;
  }

  cssVariable(name, value, element = this) {
    name = name.substr(0, 2) !== "--" ? "--" + name : name;
    if (value) {
      element.style.setProperty(name, value);
    }
    return window
      .getComputedStyle(element)
      .getPropertyValue(name)
      .trim();
  }

  // Returns a single element assigned to that slot; if multiple, it returns the first
  has_slot(name) {
    return this.querySelector(`[slot='${name}']`);
  }

  // Returns an array with all elements assigned to that slot
  has_slots(name) {
    return [...this.querySelectorAll(`[slot='${name}']`)];
  }

  get contextVariable() {
    let context = this.cssVariable("context");
    // If the context variable isn't found, look for the old name of context
    if (!context) context = this.cssVariable("theme");
    // If that value doesn't exist, look for the attribute
    if (!context) context = this.context;
    return context;
  }

  // Update the context for self and children
  context_update() {
    // TODO: update this to use :defined?
    const children = this.querySelectorAll("[pfelement]");
    let context = this.contextVariable || this.context;

    // Manually adding `pfe-c-context` attribute overrides the css variable
    // Update the css variable to match the data attribute
    if (this.context) this.cssVariable("context", this.context);

    console.log(`Update context: ${context}`);

    // Update context for self
    this.context_set(context);

    // For each nested, already upgraded component
    // set the context based on the child's value of --context
    // Note: this prevents contexts from parents overriding
    // the child's context should it exist
    [...children].map(child => {
      if (child.connected) child.context_set(context);
    });
  }

  // Get the context variable if it exists, set it as an attribute
  context_set(fallback) {
    let context = this.contextVariable;
    // If no value was returned, look for the fallback value
    if (!context && fallback) context = fallback;
    // If a value has been set and the component is upgraded, apply the on attribute
    // @TODO: should we include a wait or a promise here?
    if (context && this.hasAttribute("pfelement")) this.setAttribute("on", context);
  }

  constructor(pfeClass, { type = null, delayRender = false } = {}) {
    super();

    this.connected = false;
    this._pfeClass = pfeClass;
    this.tag = pfeClass.tag;
    this.schemaProps = pfeClass.schemaProperties;
    this.slots = pfeClass.slots;
    this._queue = [];
    this.template = document.createElement("template");

    this._initializeProperties();

    this.log(`Constructing...`);

    this.attachShadow({ mode: "open" });

    if (!delayRender) {
      this.log(`Render...`);
      this.render();
      this.log(`Rendered.`);
    }

    this.log(`Constructed.`);
  }

  connectedCallback() {
    this.connected = true;
    this.log(`Connecting...`);

    this._initializeAttributeDefaults();

    if (window.ShadyCSS) {
      this.log(`Styling...`);
      window.ShadyCSS.styleElement(this);
      this.log(`Styled.`);
    }

    // Throw a warning if the on attribute was manually added before upgrade
    if (!this.hasAttribute("pfelement") && this.hasAttribute("on")) {
      console.warn(
        `${this.tag}${
          this.id ? `[#${this.id}]` : ``
        }: The "on" attribute is protected and should not be manually added to a component. The base class will manage this value for you on upgrade.`
      );
    }

    // @TODO maybe we should use just the attribute instead of the class?
    // https://github.com/angular/angular/issues/15399#issuecomment-318785677
    this.classList.add("PFElement");
    this.setAttribute("pfelement", "");

    if (typeof this.schemaProps === "object") {
      this._mapSchemaToProperties(this.tag, this.schemaProps);
      this.log(`Properties attached.`);
    }

    if (typeof this.slots === "object") {
      this._mapSchemaToSlots(this.tag, this.slots);
      this.log(`Slots attached.`);
    }

    if (this._queue.length) {
      this._processQueue();
    }

    // Initialize the on attribute if a context variable is set
    // do not update the on attribute if a user has manually added it
    // then trigger an update in nested components
    this.context_update();

    this.log(`Connected.`);
  }

  disconnectedCallback() {
    this.log(`Disconnecting...`);

    this.connected = false;

    this.log(`Disconnected.`);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (!this._pfeClass.allProperties) {
      return;
    }

    const propName = this._pfeClass._attr2prop(attr);
    const propDef = this._pfeClass.allProperties[propName];

    if (!propDef) {
      console.warn(`Property ${propName} doesn't exist on ${this._pfeClass.name}`);
      return;
    }

    if (propDef.observer) {
      this[propDef.observer](this._castPropertyValue(propDef, oldVal), this._castPropertyValue(propDef, newVal));
    }

    if (propDef.alias) {
      console.log(`${attr} set, copying value to aliased attr ${this._pfeClass._prop2attr(propDef.alias)}`);
      const aliasedAttrVal = this.getAttribute(this._pfeClass._prop2attr(propDef.alias));
      if (aliasedAttrVal !== newVal) {
        this[propDef.alias] = newVal;
      }
    }

    if (propDef.cascade) {
      this._copyAttribute(attr, propDef.cascade);
    }
  }

  static _validateProperties() {
    for (let propName in this.allProperties) {
      const propDef = this.allProperties[propName];

      // verify that properties conform to the allowed data types
      if (!isAllowedType(propDef)) {
        throw new Error(
          `Property "${propName}" on ${this.constructor.name} must have type String, Number, or Boolean.`
        );
      }

      // verify the property name conforms to our naming rules
      if (!/^[a-z_]/.test(propName)) {
        throw new Error(
          `Property ${this.name}.${propName} defined, but prop names must begin with a lower-case letter or an underscore`
        );
      }
    }
  }

  _castPropertyValue(propDef, attrValue) {
    switch (propDef.type) {
      case Number:
        // map various attribute string values to their respective
        // desired property values
        return {
          [attrValue]: Number(attrValue),
          null: null,
          NaN: NaN
        }[attrValue];

      case Boolean:
        return attrValue !== null;

      case String:
        return {
          [attrValue]: attrValue,
          undefined: undefined
        }[attrValue];

      default:
        return attrValue;
    }
  }

  _initializeProperties() {
    const properties = this._pfeClass.allProperties;
    for (let propName in properties) {
      const propDef = properties[propName];

      // check whether the property already exists and throw a warning if it
      // does.  HTMLElements have a LOT of properties and it wouldn't be hard
      // to accidentally overwrite one.
      if (typeof this[propName] !== "undefined") {
        throw new Error(
          `Property "${propName}" on ${this.constructor.name} cannot be defined because the property name is reserved`
        );
      }

      const attrName = this._pfeClass._prop2attr(propName);

      Object.defineProperty(this, propName, {
        get: () => {
          const attrValue = this.getAttribute(attrName);

          return this._castPropertyValue(propDef, attrValue);
        },
        set: rawNewVal => {
          // console.log(this);

          if ((propDef.type === Boolean && !rawNewVal && typeof rawNewVal !== "string") || rawNewVal === null) {
            // if (propDef.type === Boolean && !rawNewVal) {
            console.log("running removeAttribute!!!");
            this.removeAttribute(attrName);
          } else {
            if (propDef.type === Boolean) {
              this.setAttribute(attrName, "");
            } else {
              this.setAttribute(attrName, rawNewVal);
            }
          }
          return rawNewVal;
        },
        writeable: true,
        enumerable: true,
        configurable: false
      });
    }
  }

  _initializeAttributeDefaults() {
    const properties = this._pfeClass.allProperties;

    for (let propName in properties) {
      const propDef = properties[propName];

      const attrName = this._pfeClass._prop2attr(propName);

      if (propDef.hasOwnProperty("default")) {
        const isDefaultBooleanFalse = propDef.type === Boolean && propDef.default === false;
        if (!isDefaultBooleanFalse && !this.hasAttribute(attrName)) {
          // console.log(`setting default value for ${prop.attrName}`);
          if (propDef.type === Boolean) {
            this.setAttribute(attrName, "");
          } else {
            this.setAttribute(attrName, propDef.default);
          }
        }
      }
    }

    // if (this._pfeClass.allProperties) {
    //   Object.keys(this._pfeClass.allProperties)
    //     .map(prop => ({
    //       propName: prop,
    //       attrName: this._pfeClass._prop2attr(prop),
    //       definition: this._pfeClass.allProperties[prop]
    //     }))
    //     .filter(prop => prop.definition.hasOwnProperty("default"))
    //     .forEach(prop => {
    //       const isDefaultBooleanFalse =
    //         prop.definition.type === Boolean &&
    //         prop.definition.default === false;
    //       if (!isDefaultBooleanFalse && !this.hasAttribute(prop.attrName)) {
    //         // console.log(`setting default value for ${prop.attrName}`);
    //         this.setAttribute(prop.attrName, prop.definition.default);
    //       }
    //     });
    // }
  }

  /**
   * Convert a property name to an attribute name.
   */
  static _prop2attr(propName) {
    const propDef = this.allProperties[propName];

    if (propDef.attr) {
      return propDef.attr;
    }

    const attrPrefix = propDef.prefix === false ? "" : this.attrPrefix;
    return attrPrefix + propName.replace(/^[A-Z]/, l => l.toLowerCase()).replace(/[A-Z]/g, l => `-${l.toLowerCase()}`);
  }

  /**
   * Convert an attribute name to a property name.
   */
  static _attr2prop(attrName) {
    // when converting attribute name to property name, we can attempt to
    // remove the prefix without knowing yet if the property is prefixed.  if
    // no prefix is there, nothing changes, so it's a harmless operation
    // (famous last words).
    for (let prop in this.allProperties) {
      if (this.allProperties[prop].attr === attrName) {
        return prop;
      }
    }

    const attrPrefix = this.attrPrefix;
    const propName = attrName
      .replace(new RegExp(`^${attrPrefix}`), "")
      .replace(/-([A-Za-z])/g, l => l[1].toUpperCase());
    return propName;
  }

  _copyAttribute(name, to) {
    const recipients = [...this.querySelectorAll(to), ...this.shadowRoot.querySelectorAll(to)];
    const value = this.getAttribute(name);
    const fname = value == null ? "removeAttribute" : "setAttribute";
    for (const node of recipients) {
      node[fname](name, value);
    }
  }

  // Map the imported properties json to real schemaProps on the element
  // @notice static getter of properties is built via tooling
  // to edit modify src/element.json
  _mapSchemaToProperties(tag, properties) {
    this.log("Mapping properties...");
    // Loop over the properties provided by the schema
    Object.keys(properties).forEach(attr => {
      let data = properties[attr];

      // Only attach the information if the data provided is a schema object
      if (typeof data === "object") {
        // Prefix default is true
        let hasPrefix = true;
        let attrName = attr;
        // Set the attribute's property equal to the schema input
        this[attr] = data;
        // Initialize the value to null
        this[attr].value = null;

        if (typeof this[attr].prefixed !== "undefined") {
          hasPrefix = this[attr].prefixed;
        }

        if (hasPrefix) {
          attrName = `${prefix}-c-${attr}`;
        }

        // If the attribute exists on the host
        if (this.hasAttribute(attrName)) {
          // Set property value based on the existing attribute
          this[attr].value = this.getAttribute(attrName);
        }
        // Otherwise, look for a default and use that instead
        else if (data.default) {
          const dependency_exists = this._hasDependency(tag, data.options);
          const no_dependencies = !data.options || (data.options && !data.options.dependencies.length);
          // If the dependency exists or there are no dependencies, set the default
          if (dependency_exists || no_dependencies) {
            this.setAttribute(attrName, data.default);
            this[attr].value = data.default;
          }
        }
      }
    });

    this.log("Properties mapped.");
  }

  // Test whether expected dependencies exist
  _hasDependency(tag, opts) {
    // Get any possible dependencies for this attribute to exist
    let dependencies = opts ? opts.dependencies : [];
    // Initialize the dependency return value
    let hasDependency = false;
    // Check that dependent item exists
    // Loop through the dependencies defined
    for (let i = 0; i < dependencies.length; i += 1) {
      const slot_exists = dependencies[i].type === "slot" && this.has_slots(`${tag}--${dependencies[i].id}`).length > 0;
      const attribute_exists =
        dependencies[i].type === "attribute" && this.getAttribute(`${prefix}-${dependencies[i].id}`);
      // If the type is slot, check that it exists OR
      // if the type is an attribute, check if the attribute is defined
      if (slot_exists || attribute_exists) {
        // If the slot does exist, add the attribute with the default value
        hasDependency = true;
        // Exit the loop
        break;
      }
    }
    // Return a boolean if the dependency exists
    return hasDependency;
  }

  // Map the imported slots json
  // @notice static getter of properties is built via tooling
  // to edit modify src/element.json
  _mapSchemaToSlots(tag, slots) {
    this.log("Validate slots...");
    // Loop over the properties provided by the schema
    Object.keys(slots).forEach(slot => {
      let slotObj = slots[slot];

      // Only attach the information if the data provided is a schema object
      if (typeof slotObj === "object") {
        let slotExists = false;
        let result = [];
        // If it's a named slot, look for that slot definition
        if (slotObj.namedSlot) {
          // Check prefixed slots
          result = this.has_slots(`${tag}--${slot}`);
          if (result.length > 0) {
            slotObj.nodes = result;
            slotExists = true;
          }

          // Check for unprefixed slots
          result = this.has_slots(`${slot}`);
          if (result.length > 0) {
            slotObj.nodes = result;
            slotExists = true;
          }
          // If it's the default slot, look for direct children not assigned to a slot
        } else {
          result = [...this.children].filter(child => !child.hasAttribute("slot"));

          if (result.length > 0) {
            slotObj.nodes = result;
            slotExists = true;
          }
        }

        // If the slot exists, attach an attribute to the parent to indicate that
        if (slotExists) {
          this.setAttribute(`has_${slot}`, "");
        } else {
          this.removeAttribute(`has_${slot}`);
        }
      }
    });
    this.log("Slots validated.");
  }

  _queueAction(action) {
    this._queue.push(action);
  }

  _processQueue() {
    this._queue.forEach(action => {
      this[`_${action.type}`](action.data);
    });

    this._queue = [];
  }

  _setProperty({ name, value }) {
    this[name] = value;
  }

  /**
   * Set a given property name to the given value.  This is used when setting
   * reflected properties.  Reflected properties are created when an attribute
   * definition includes `reflect: true`, and have two-way binding with their
   * respective attributes.
   *
   * The two-way binding is mediated by a type-casting system.  Attribute
   * definitions can be String, Number, or Boolean.  This is complicated by the
   * fact that attribute values can only be strings.  To overocme that limitation,
   */
  // _propertySetter({ name, value }) {
  //   const propDef = this._pfeClass.allProperties[name];
  //   const oldVal = this._________TOP_SECRET__[name];
  //   // attempt to cast the new value to the new value's type
  //   const castVal =
  //     propDef.type === Boolean
  //       ? { true: true, false: false }[value] || false
  //       : propDef.type(value);
  //   console.log(
  //     `${this.constructor.name}.allProperties.${name} setter was ${oldVal}, received ${value}, cast it to ${propDef.type.name} which returned ${castVal}`
  //   );

  //   // bail early if the value didn't change
  //   if (oldVal === castVal) {
  //     console.log(
  //       `${this.constructor.name}.allProperties.${name} assigned a value equal to its old value, skipping rest of the setter`
  //     );
  //     return;
  //   }

  //   // do a type check before anything else
  //   if (castVal.constructor !== propDef.type) {
  //     console.warn(
  //       `can't set ${propDef.type.name} attribute ${this.constructor.name}.allProperties.${name} to ${castVal}, a ${castVal.constructor.name} value`
  //     );
  //     return;
  //   }

  //   if (propDef.observer && this[propDef.observer]) {
  //     this[propDef.observer].call(this, oldVal, castVal);
  //   }

  //   this._________TOP_SECRET__[name] = castVal;

  //   // if reflected, update the attribute as well.
  //   if (propDef.reflect && propDef.type === Boolean && castVal === false) {
  //     // for boolean properties, if they're set to false, remove the attribute instead of setting `attrName="false"`
  //     console.log(
  //       `Boolean property ${
  //         this.constructor.name
  //       }.allProperties.${name} set to false; removing attribute ${prop2attr(
  //         name,
  //         this._pfeClass.attrPrefix
  //       )}`
  //     );
  //     this.removeAttribute(prop2attr(name, this._pfeClass.attrPrefix));
  //   } else if (propDef.reflect) {
  //     console.log(
  //       `property ${
  //         this.constructor.name
  //       }.allProperties.${name} set to ${castVal}; updating attribute ${prop2attr(
  //         name,
  //         this._pfeClass.attrPrefix
  //       )}`
  //     );
  //     this.setAttribute(prop2attr(name, this._pfeClass.attrPrefix), castVal);
  //   }
  //   this[name] = value;
  // }

  // @TODO This is a duplicate function to cssVariable above, combine them
  static var(name, element = document.body) {
    return window
      .getComputedStyle(element)
      .getPropertyValue(name)
      .trim();
  }

  var(name) {
    return PFElement.var(name, this);
  }

  render() {
    this.shadowRoot.innerHTML = "";
    this.template.innerHTML = this.html;

    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(this.template, this.tag);
    }

    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  log(...msgs) {
    PFElement.log(`[${this.tag}]`, ...msgs);
  }

  emitEvent(name, { bubbles = true, cancelable = false, composed = false, detail = {} } = {}) {
    this.log(`Custom event: ${name}`);
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles,
        cancelable,
        composed,
        detail
      })
    );
  }
}

autoReveal(PFElement.log);

export default PFElement;
