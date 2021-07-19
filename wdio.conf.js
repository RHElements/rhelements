const { join } = require("path");
const { exec } = require("child_process");

const argv = require("yargs").argv;
const patterns = argv._.length > 1 ? argv._.slice(1) : [];

require("dotenv").config();

let proc;

exports.config = {
  logLevel: "error",
  framework: "mocha",
  mochaOpts: {
    colors: true,
    timeout: 90000
  },
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  baseUrl: "http://localhost:8080/",
  specs: [`./elements/${patterns.length > 0 ? `+(${patterns.join("|")})` : "*"}/test/*_e2e.js`],
  reporters: ["spec"],
  maxInstances: 3,
  capabilities: [
    {
      platform: "OS X",
      browserName: "chrome",
      version: "83.0",
      resolution: "1920x1080"
    },
    {
      platform: "Windows 10",
      browserName: "IE",
      version: "11.0",
      resolution: "1920x1080"
    }
  ],
  services: [
    [
      "browserstack",
      {
        browserstackLocal: true,
        selenium_version: "3.5.2"
      }
    ],
    [
      "image-comparison",
      {
        baselineFolder: join(process.cwd(), "./test/vrt-baseline/"),
        formatImageName: `{tag}`,
        screenshotPath: join(process.cwd(), "./test/vrt-snapshots"),
        savePerInstance: true,
        autoSaveBaseline: true,
        blockOutStatusBar: true,
        blockOutToolBar: true,
        disableCSSAnimation: true,
        hideScrollBars: true
      }
    ]
  ],
  onPrepare: () => {
    proc = exec("http-server");
  },
  onComplete: () => {
    proc.kill();
  }
};
