import { BuilderEnum } from "../const";
import { moduleExist } from "../moduleExist";

/**
 * Special method for determine builders
 */
export function necessaryLibChecker(builder: BuilderEnum) {
  if ([BuilderEnum.CRA, BuilderEnum.NEXT].includes(builder)) {
    /**
     * Check if developer using @svgr/webpack
     */
    if (!moduleExist("@svgr/webpack") || !moduleExist("babel-plugin-inline-react-svg")) {
      throw new Error(
        "You need to install one of these libraries [@svgr/webpack | babel-plugin-inline-react-svg] to support svg as components",
      );
    }
  }

  if (builder === BuilderEnum.VITE && !moduleExist("vite-plugin-svgr")) {
    throw new Error("You need to install library [vite-plugin-svgr] to support svg as components");
  }

  if (builder === BuilderEnum.REACT_NATIVE && !moduleExist("react-native-svg")) {
    throw new Error("You need to install library [vite-plugin-svgr] to support svg as components");
  }
}
