import path from "path";

import { CoreOptions, DEFAULT_ADAPTER_FOLDER } from "..";
import { getAdapterTpl } from "./getAdapterTpl";
import { getComponentTpl } from "./getComponentTpl";

export function getGenericPaths(options: CoreOptions) {
  const { componentPath, svgPath, template } = options;

  /**
   * Generation adapter path folder
   * @Example src/components/Icon/__generated__
   */
  const adapterPath = path.join(componentPath, DEFAULT_ADAPTER_FOLDER);

  /**
   * Getting svg paths relative to the svg`s path (for adapters)
   * @Example src/components/Icon/__generated__
   */
  const relativeSvgPath = path.relative(adapterPath, svgPath);

  const { adapterFileTpl, adapterFileName } = getAdapterTpl(options);

  /**
   * Generation adapter path file
   * @Example src/components/Icon/__generated__/dynamic-adapter.ts
   */
  const adapterFilePath = path.join(adapterPath, adapterFileName);

  /**
   * Generation tpl adapter by type
   * @Example lib/templates/adapter/dynamic.ts.template
   */
  const adapterTplPath = path.resolve(__dirname, "../../templates/adapter", adapterFileTpl);

  /**
   *
   */
  const { componentFilePath, componentTplFile } = getComponentTpl(options);

  /**
   * Generation tpl component
   * @Example lib/templates/react/ts.template
   */
  const componentTplPath = template ?? path.resolve(__dirname, "../../templates", componentTplFile);

  return {
    adapterPath,
    adapterTplPath,
    adapterFilePath,
    adapterFileName,
    adapterFileTpl,
    componentPath,
    componentFilePath,
    componentTplPath,
    relativeSvgPath,
  };
}
