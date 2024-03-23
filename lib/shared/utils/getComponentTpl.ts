import path from "path";

import { TPL_PATHS, DEFAULT_COMPONENT_FILE_NAME } from "../const";
import { CoreOptions } from "../types";

export function getComponentTpl({
  componentPath,
  typescript,
  dynamic,
  nameFileComp = DEFAULT_COMPONENT_FILE_NAME,
}: CoreOptions) {
  const componentFilePath = path.join(
    componentPath,
    `${nameFileComp}${typescript ? ".tsx" : ".jsx"}`,
  );

  let componentTplFile = "component/";

  switch (true) {
    case typescript && dynamic:
      componentTplFile += TPL_PATHS.dynamicTs;
      break;
    case typescript && !dynamic:
      componentTplFile += TPL_PATHS.staticTs;
      break;
    case !typescript && dynamic:
      componentTplFile += TPL_PATHS.dynamicJs;
      break;
    default:
      componentTplFile += TPL_PATHS.staticJs;
  }

  return {
    componentTplFile,
    componentFilePath,
  };
}
