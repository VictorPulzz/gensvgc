import { CliOptions } from "./types";

export const DEFAULT_SVG_PATH = "public/assets/icons";

export const DEFAULT_COMPONENT_PATH = "src/components/Icon";

export const DEFAULT_ADAPTER_FOLDER = "__generated__";

export const DEFAULT_COMPONENT_FILE_NAME = "Icon";

export const TPL_PATHS = {
  dynamicJs: "dynamic.js.template",
  staticJs: "static.js.template",
  dynamicTs: "dynamic.ts.template",
  staticTs: "static.ts.template",
};

export const ADAPTERS_FILE_NAME = {
  dynamicJs: "dynamic-adapter.js",
  staticJs: "static-adapter.js",
  dynamicTs: "dynamic-adapter.ts",
  staticTs: "static-adapter.ts",
};

export const enum BuilderEnum {
  CRA = "cra",
  NEXT = "next",
  REACT_NATIVE = "react-native",
  VITE = "vite",
}

export const DEFAULT_CONFIG: CliOptions = {
  after: undefined,
  dynamic: false,
  nameFileComp: DEFAULT_COMPONENT_FILE_NAME,
  skipInitial: false,
  template: undefined,
  watch: false,
  typescript: false,
};
