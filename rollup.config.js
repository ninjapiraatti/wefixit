import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: "src/templates/js/main.js",
  "output": {
    file: "ProcessWire/site/templates/js/main.js",
    format: "iife",
  },
  name: "common",
  plugins: [nodeResolve(), commonjs()]
};
