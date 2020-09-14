suite("<pfe-number>", () => {
  test("it should upgrade", () => {
    assert.instanceOf(
      document.querySelector("pfe-number"),
      customElements.get("pfe-number"),
      "the <pfe-number> should be an instance of PfeNumber"
    );
  });

  suite("unprefixed attributes, soon to be depreacted", () => {
    test("it should show an ordinal number", () => {
      const pfeNumber = document.querySelector('pfe-number.old-attr-style[type="ordinal"]');
      let content = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(content, "1st");
    });

    test("it should show bytes", () => {
      const pfeNumber = document.querySelector('pfe-number.old-attr-style[type="bytes"]');
      const content = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(content, "1.97 KiB");
    });

    test("it should show a percentage", () => {
      const pfeNumber = document.querySelector('pfe-number.old-attr-style[type="percent"]');
      const content = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(content, "57%");
    });

    test("it should show an exponential number", () => {
      const pfeNumber = document.querySelector('pfe-number.old-attr-style[type="e"]');
      const content = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(content, "2.000e+6");
    });

    test("it should show a thousands number with a decimal", () => {
      const pfeNumber = document.querySelector('pfe-number.old-attr-style[type="thousands"]#with-dec');
      const content = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(content, "1 234.12");
    });

    test("it should show a thousands number without a decimal", () => {
      const pfeNumber = document.querySelector('pfe-number.old-attr-style[type="thousands"]#without-dec');
      const content = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(content, "1 234");
    });

    test("it should react to the number changing", () => {
      const pfeNumber = document.querySelector("#test-change");
      const before = pfeNumber.shadowRoot.querySelector("span").textContent;

      pfeNumber.setAttribute("number", 20);
      const after = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(after, "20");
    });

    test("it should show nothing if the number is not valid", () => {
      const pfeNumber = document.querySelector("#invalid-number");
      const content = pfeNumber.shadowRoot.querySelector("span").textContent;
      assert.equal(content, "");
    });
  });

  suite("prefixed attributes", () => {
    test("it should show an ordinal number", () => {
      const pfeNumber = document.querySelector('pfe-number.new-attr-style[pfe-c-type="ordinal"]');
      let content = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(content, "1st");
    });

    test("it should show bytes", () => {
      const pfeNumber = document.querySelector('pfe-number.new-attr-style[pfe-c-type="bytes"]');
      const content = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(content, "1.97 KiB");
    });

    test("it should show a percentage", () => {
      const pfeNumber = document.querySelector('pfe-number.new-attr-style[pfe-c-type="percent"]');
      const content = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(content, "57%");
    });

    test("it should show an exponential number", () => {
      const pfeNumber = document.querySelector('pfe-number.new-attr-style[pfe-c-type="e"]');
      const content = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(content, "2.000e+6");
    });

    test("it should show a thousands number with a decimal", () => {
      const pfeNumber = document.querySelector('pfe-number.new-attr-style[pfe-c-type="thousands"]#new-with-dec');
      const content = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(content, "1 234.12");
    });

    test("it should show a thousands number without a decimal", () => {
      const pfeNumber = document.querySelector('pfe-number.new-attr-style[pfe-c-type="thousands"]#new-without-dec');
      const content = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(content, "1 234");
    });

    test("it should react to the number changing", () => {
      const pfeNumber = document.querySelector("#new-test-change");
      const before = pfeNumber.shadowRoot.querySelector("span").textContent;

      pfeNumber.setAttribute("number", 20);
      const after = pfeNumber.shadowRoot.querySelector("span").textContent;

      assert.equal(after, "20");
    });

    test("it should show nothing if the number is not valid", () => {
      const pfeNumber = document.querySelector("#new-invalid-number");
      const content = pfeNumber.shadowRoot.querySelector("span").textContent;
      assert.equal(content, "");
    });
  });
});
