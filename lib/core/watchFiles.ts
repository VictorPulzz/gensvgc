import chokidar from "chokidar";
import camelCase from "lodash.camelcase";
import path from "path";

import { alerts, CoreOptions, FileObject } from "../shared";
import { writeFile } from "./writeFile";

export const watchFiles = (options: CoreOptions): void => {
  const { svgPath } = options;
  const svgAllFilesPaths = `${svgPath}/**/*.svg`;

  alerts.success("Watching files...");

  const allFiles: FileObject = {};

  chokidar
    .watch(svgAllFilesPaths, {
      ignoreInitial: options.skipInitial,
      awaitWriteFinish: true,
    })
    .on("all", (action, pathFile) => {
      const parseFiles = path.parse(pathFile);

      if (action === "add") {
        alerts.info(`[ADDED] ${pathFile}`);
        allFiles[parseFiles.name] = {
          ...parseFiles,
          fileName: camelCase(parseFiles.name),
        };
      }

      if (action === "change") {
        alerts.info(`[CHANGED] ${pathFile}`);
        allFiles[parseFiles.name] = {
          ...parseFiles,
          fileName: camelCase(parseFiles.name),
        };
      }

      if (action === "unlink") {
        alerts.info(`[REMOVED] ${pathFile}`);
        delete allFiles[parseFiles.name];
      }

      writeFile(allFiles, options);
    });
};
