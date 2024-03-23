import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  preset: "ts-jest",
  clearMocks: true,
  testMatch: ["**/__tests__/**/*.test.ts"],
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/", "(.*).d.ts"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\](?!bundle-require).+\\.js$"],
  moduleFileExtensions: ["ts", "tsx", ...defaults.moduleFileExtensions],
};

export default config;
