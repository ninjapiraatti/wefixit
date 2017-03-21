import nodeResolve from "rollup-plugin-node-resolve";

export default {
  entry: "src/templates/js/main.js",
  dest: "ProcessWire/site/templates/js/main.js",
  format: "iife",
  moduleName: "common",
  plugins: [nodeResolve()]
};
