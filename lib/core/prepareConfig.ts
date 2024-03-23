import { cosmiconfig } from "cosmiconfig";

import { alerts, AnyObject, CliOptions, DEFAULT_CONFIG } from "../shared";

export const prepareConfig = async (cliOptions: CliOptions) => {
  const configFromFile = await loadConfigFromFile();
  return mergeConfig(cliOptions, configFromFile);
};

async function loadConfigFromFile(): Promise<AnyObject | CliOptions> {
  try {
    const config = await cosmiconfig("gensvgc").search();
    return config?.config ?? {};
  } catch (error) {
    alerts.error(`An error occurred loading the config file:\n${error}`);
    return {};
  }
}

function mergeConfig(cliOptions: CliOptions, fileOptions: AnyObject | CliOptions): CliOptions {
  return {
    ...DEFAULT_CONFIG,
    ...cliOptions,
    ...fileOptions,
  };
}
