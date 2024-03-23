export function moduleExist(name: string) {
  try {
    require.resolve(name);
  } catch (error: any) {
    if (error.code === "MODULE_NOT_FOUND") {
      return false;
    }
  }
  return true;
}
