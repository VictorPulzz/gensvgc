import { ParsedPath } from "path";

import { BuilderEnum } from "./const";

export type AnyVoidFunction = (...args: any[]) => void;

export type AnyObject = Record<string, any>;

export type CliOptions = {
  after?: string;
  dynamic?: boolean;
  nameFileComp?: string;
  skipInitial?: boolean;
  template?: string;
  typescript?: boolean;
  watch?: boolean;
};

export type CoreOptions = CliOptions & {
  builder: BuilderEnum;
  componentPath: string;
  svgPath: string;
};

export type FileObject = {
  [key in string]: ParsedPath & {
    fileName: string;
  };
};
