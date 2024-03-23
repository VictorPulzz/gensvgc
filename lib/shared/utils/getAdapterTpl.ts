import { ADAPTERS_FILE_NAME, TPL_PATHS } from "../const";
import { CoreOptions } from "../types";

export function getAdapterTpl({ typescript, dynamic }: CoreOptions) {
  switch (true) {
    case !dynamic && typescript:
      return {
        adapterFileName: ADAPTERS_FILE_NAME.staticTs,
        adapterFileTpl: TPL_PATHS.staticTs,
      };
    case !dynamic && !typescript:
      return {
        adapterFileName: ADAPTERS_FILE_NAME.staticJs,
        adapterFileTpl: TPL_PATHS.staticJs,
      };
    case dynamic && !typescript:
      return {
        adapterFileName: ADAPTERS_FILE_NAME.dynamicJs,
        adapterFileTpl: TPL_PATHS.dynamicJs,
      };
    default:
      return {
        adapterFileName: ADAPTERS_FILE_NAME.dynamicTs,
        adapterFileTpl: TPL_PATHS.dynamicTs,
      };
  }
}
