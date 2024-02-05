import { changeDir } from "./cd.js";

export const up = (cwd) => {
  changeDir(cwd, "..");
};
