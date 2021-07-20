import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfePlaceholder from "../dist/pfe-placeholder";

const stories = storiesOf("Placeholder", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfePlaceholder.tag, data.prop, data.slots);
};

// Use these to get dynamically generated content
// const defaultHeading = tools.autoHeading(true);
const defaultContent = "placeholder";

stories.addDecorator(bridge.withKnobs);

stories.add(PfePlaceholder.tag, () => {
  let config = {};
  // const props = PfePlaceholder.properties;

  //-- Set any custom defaults just for storybook here

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfePlaceholder);

  const slots = PfePlaceholder.slots;

  //-- Set any custom content for the slots here

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, bridge);

  //-- Build your slots here using config.has[""] to get user content
  // prettier-ignore
  config.slots = [{
    content: defaultContent
  }];

  //-- Reset default values show they don't render in the markup
  // if (config.prop["width"] === "default") {
  //   config.prop["width"] = "";
  // }

  const rendered = template(config);
  return tools.preview(rendered);
});
