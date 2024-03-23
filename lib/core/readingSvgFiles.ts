import glob from "fast-glob";
import camelCase from "lodash.camelcase";
import path from "path";

import { alerts, CoreOptions, FileObject } from "../shared";
import { writeFile } from "./writeFile";

export function readingSvgFiles(options: CoreOptions) {
  const { svgPath } = options;
  const svgAllFilesPaths = `${svgPath}/**/*.svg`;

  alerts.success(`Reading files from ${svgPath}...`);

  const files = glob.sync(svgAllFilesPaths, { onlyFiles: true });

  const allFiles: FileObject = {};

  files.forEach(item => {
    const parseFiles = path.parse(item);
    allFiles[parseFiles.name] = {
      ...parseFiles,
      fileName: camelCase(parseFiles.name),
    };
  });

  writeFile(allFiles, options);
}
