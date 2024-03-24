import fs from "fs/promises";

import { alerts, BuilderEnum, CoreOptions, DEFAULT_ADAPTER_FOLDER } from "../shared";
import { getGenericPaths } from "../shared/utils/getGenericPaths";

export async function generateComponents(
  { componentFilePath, componentTplPath, adapterFileName }: ReturnType<typeof getGenericPaths>,
  { typescript, builder }: CoreOptions,
) {
  try {
    let generateData = await fs.readFile(componentTplPath, "utf8");

    if (builder === BuilderEnum.REACT_NATIVE) {
      generateData = generateData
        .replace("{extendType}", "SvgProps")
        .replace("{rnTypesImport}", "import { SvgProps } from 'react-native-svg';");
    } else {
      generateData = generateData
        .replace("{extendType}", "React.SVGProps<SVGSVGElement>")
        .replace("{rnTypesImport}", "");
    }

    if (typescript) {
      generateData = generateData
        .replace(
          "{svgTypesAndComponentImports}",
          `import { getSvgComponent, SvgComponentType, SvgIconsType } from "./${DEFAULT_ADAPTER_FOLDER}/${adapterFileName}";`,
        )
        .replace("{svgIconsType}", "SvgIconsType");
    } else {
      generateData = generateData.replace(
        "{svgTypesAndComponentImports}",
        `import { getSvgComponent } from "./${DEFAULT_ADAPTER_FOLDER}/${adapterFileName}";`,
      );
    }

    if (builder === BuilderEnum.NEXT) {
      generateData = generateData.replace("{nextUseClient}", '"use client";\n\n');
    } else {
      generateData = generateData.replace("{nextUseClient}", "");
    }

    await fs.writeFile(componentFilePath, generateData, {
      encoding: "utf8",
      flag: "w",
    });
  } catch (error) {
    alerts.error(`An error occurred while creating the dynamic import function:\n${error}`);
  }
}
