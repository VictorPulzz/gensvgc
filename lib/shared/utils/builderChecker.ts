import { BuilderEnum } from "../const";
import { moduleExist } from "../moduleExist";

/**
 * Special method for determine builders
 */
export function builderChecker() {
  if (moduleExist("react-native")) {
    return BuilderEnum.REACT_NATIVE;
  }

  if (moduleExist("react")) {
    if (moduleExist("next")) {
      return BuilderEnum.NEXT;
    }
    if (moduleExist("vite")) {
      return BuilderEnum.VITE;
    }
  }

  return false;
}
