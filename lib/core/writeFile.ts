import fs from "fs";
import debounce from "lodash.debounce";
import shell from "shelljs";

import { alerts, CoreOptions, FileObject } from "../shared";
import { getGenericPaths } from "../shared/utils/getGenericPaths";
import { generateDynamicAdapter, generateStaticAdapter } from "./generateAdapters";
import { generateComponents } from "./generateComponents";

export const writeFile = debounce(async (filesObject: FileObject, options: CoreOptions) => {
  const paths = getGenericPaths(options);

  /**
   * Generate folder for adapter
   * @Example: "src/components/Icon/__generated__"
   */
  try {
    if (!fs.existsSync(paths.adapterPath)) {
      fs.mkdirSync(paths.adapterPath, { recursive: true });
      alerts.warn(
        `This folder ${paths.componentPath} did not exist, so it was created automatically`,
      );
    }
  } catch (error) {
    alerts.error(`An error occurred while creating a folder: ${paths.componentPath}`);
  }

  if (options.dynamic) {
    await generateDynamicAdapter(filesObject, paths, options);
  } else {
    await generateStaticAdapter(filesObject, paths, options);
  }

  await generateComponents(paths, options);

  if (options.after) {
    shell.exec(options.after);
  }
}, 200);
