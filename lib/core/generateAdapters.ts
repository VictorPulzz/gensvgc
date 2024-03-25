import fs from "fs/promises";
import path from "path";

import { alerts, BuilderEnum, CoreOptions, FileObject } from "../shared";
import { getGenericPaths } from "../shared/utils/getGenericPaths";

function genSvgPath(
  svgPath: string,
  relative: string,
  file: FileObject[string],
  vitePostfix: string,
) {
  /**
   * Add postfix for handle vite-plugin-svgr package
   */
  const removeRootPath = relative.replace(path.normalize(svgPath), "");
  return path.join(removeRootPath, path.normalize(file.dir), file.base) + vitePostfix;
}

export async function generateDynamicAdapter(
  filesObject: FileObject,
  { adapterFilePath, relativeSvgPath, adapterTplPath }: ReturnType<typeof getGenericPaths>,
  { typescript, builder, svgPath }: CoreOptions,
) {
  const filesList = Object.entries(filesObject);
  const vitePostfix = builder === BuilderEnum.VITE ? "?react" : "";

  const mappedSvgTypes = filesList
    .map(([, values]) => {
      return `"${values.fileName}"`;
    })
    .join(" | ");

  const mappedSvgSwitch = filesList
    .map(([, values]) => {
      const resultSvgPath = genSvgPath(svgPath, relativeSvgPath, values, vitePostfix);
      return `
    case "${values.fileName}":
      svgComponent = await import("${resultSvgPath}");
      break;`;
    })
    .join("");

  try {
    let generateData = await fs.readFile(adapterTplPath, "utf8");

    if (typescript) {
      generateData = generateData.replace("{svgNames}", mappedSvgTypes);
    }

    generateData = generateData.replace("{svgSwitch}", mappedSvgSwitch);

    generateData = generateData.replace("{vitePostfix}", vitePostfix);

    await fs.writeFile(adapterFilePath, generateData, {
      encoding: "utf8",
      flag: "w",
    });
  } catch (error) {
    alerts.error(`An error occurred while creating the dynamic import function:\n${error}`);
  }
}

export async function generateStaticAdapter(
  filesObject: FileObject,
  { adapterFilePath, relativeSvgPath, adapterTplPath }: ReturnType<typeof getGenericPaths>,
  { builder, svgPath }: CoreOptions,
) {
  const filesList = Object.entries(filesObject);
  const vitePostfix = builder === BuilderEnum.VITE ? "?react" : "";

  const mappedSvgImports = filesList
    .map(([, values], index) => {
      const resultSvgPath = genSvgPath(svgPath, relativeSvgPath, values, vitePostfix);
      return `import ${values.fileName} from "${resultSvgPath}";${filesList.length - 1 !== index ? "\n" : ""}`;
    })
    .join("");

  const mappedSvgIcons = filesList
    .map(([, values], index) => {
      return `${values.fileName},${filesList.length - 1 !== index ? "\n" : ""}`;
    })
    .join("");

  try {
    let generateData = await fs.readFile(adapterTplPath, "utf8");

    generateData = generateData.replace("{svgImports}", mappedSvgImports);
    generateData = generateData.replace("{svgIcons}", mappedSvgIcons);

    await fs.writeFile(adapterFilePath, generateData, {
      encoding: "utf8",
      flag: "w",
    });
  } catch (error) {
    alerts.error(`An error occurred while creating the dynamic import function:\n${error}`);
  }
}
