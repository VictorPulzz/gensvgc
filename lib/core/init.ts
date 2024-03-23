import { alerts, CliOptions, DEFAULT_COMPONENT_PATH, DEFAULT_SVG_PATH } from "../shared";
import { builderChecker } from "../shared/utils/builderChecker";
import { necessaryLibChecker } from "../shared/utils/necessaryLibChecker";
import { prepareConfig } from "./prepareConfig";
import { readingSvgFiles } from "./readingSvgFiles";
import { watchFiles } from "./watchFiles";

interface InitProps {
  options: Partial<CliOptions & { dev?: boolean }>;
  svgPath: string;
  componentPath?: string;
}

export async function init({
  svgPath = DEFAULT_SVG_PATH,
  componentPath = DEFAULT_COMPONENT_PATH,
  options,
}: InitProps) {
  const config = await prepareConfig(options);
  const builder = builderChecker();

  if (!builder) {
    return alerts.error(
      `Unknown builder. Only the following are supported: Next, Cra, Vite, React-Native. For Next Vite install react`,
    );
  }

  if (!options.dev) {
    try {
      necessaryLibChecker(builder);
    } catch (e) {
      return alerts.error(e as string);
    }
  }

  const coreOptions = {
    svgPath,
    componentPath,
    builder,
    ...config,
  };

  if (config.watch) {
    watchFiles(coreOptions);
  } else {
    readingSvgFiles(coreOptions);
  }

  return undefined;
}
