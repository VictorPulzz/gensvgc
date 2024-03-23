import chalk from "chalk";

type AnyVoidFunction = (...args: any[]) => void;

const showAlert =
  <T extends AnyVoidFunction>(cb: T) =>
  (...args: Parameters<T>) => {
    return cb(...args);
  };

const info = showAlert((message: string) => console.log(chalk.gray(message)));
const error = showAlert((message: string) => console.log(chalk.red(message)));
const warn = showAlert((message: string) => console.log(chalk.yellowBright(message)));
const success = showAlert((message: string) => console.log(chalk.green(message)));

export const alerts = { info, error, warn, success };
