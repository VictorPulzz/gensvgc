#!/usr/bin/env node

import yargs from "yargs";

import { init } from "./core";
import { DEFAULT_COMPONENT_FILE_NAME, DEFAULT_COMPONENT_PATH, DEFAULT_SVG_PATH } from "./shared";

const { _: command, ...options } = yargs
  .usage(
    "Generate svg component.\nUsage: $0 {path to folder with svg files} {path to result component} [options]",
  )
  .example(
    `$0 ${DEFAULT_SVG_PATH}`,
    `All .svg files at any level in the ${DEFAULT_SVG_PATH} directory and save default folder ${DEFAULT_COMPONENT_PATH}.\n`,
  )
  .example(
    `$0 ${DEFAULT_SVG_PATH} --watch`,
    `All .svg files at any level in the ${DEFAULT_SVG_PATH} directory and save default folder ${DEFAULT_COMPONENT_PATH}.\n`,
  )
  .example(
    `$0 ${DEFAULT_SVG_PATH} --template=path/to/template`,
    "Generate svg component by template.\n\n",
  )
  .example(
    `$0 ${DEFAULT_SVG_PATH} --dynamic`,
    "Generate svg component with dynamic load svg files.\n\n",
  )
  .example(`$0 ${DEFAULT_SVG_PATH} --typescript`, "Generate component with typescript.\n")
  .example(
    `$0 ${DEFAULT_SVG_PATH} --after="npm run eslint"`,
    "Can be used to call custom commands.\n",
  )
  .example(
    `$0 ${DEFAULT_SVG_PATH} --nameFileComp="${DEFAULT_COMPONENT_FILE_NAME}"`,
    "Pass custom name for component\n",
  )
  .example(`$0 ${DEFAULT_SVG_PATH} --skipInitial`, "Skip initial generation.\n")
  .demandCommand(1)
  .option("template", {
    alias: "t",
    string: true,
    type: "string",
    describe: "Path to template for component.",
  })
  .option("dynamic", {
    alias: "d",
    boolean: true,
    type: "boolean",
    describe: "Generate component with dynamic load svg files.",
  })
  .option("typescript", {
    alias: "s",
    boolean: true,
    type: "boolean",
    describe: "Generate component with typescript.",
  })
  .option("after", {
    alias: "a",
    string: true,
    type: "string",
    describe: "Pass custom commands which will be called after each generation of the component.",
  })
  .option("nameFileComp", {
    alias: "n",
    string: true,
    type: "string",
    describe: "Pass custom component name.",
  })
  .option("skipInitial", {
    alias: "i",
    boolean: true,
    type: "boolean",
    describe: "Skip initial generation.",
  })
  .parseSync();

init({
  svgPath: command[0] as string,
  componentPath: command[1] as string,
  options,
});
