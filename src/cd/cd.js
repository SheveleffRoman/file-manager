import { readdir } from "node:fs/promises";
import path from "path";

export const changeDir = async (cwd, pathToDir) => {
  const extractPath = pathToDir.trim().split(" ").slice(1).join(" ");
  if (extractPath.startsWith("/")) {
    const absolutePath = path.join(extractPath);
    try {
      const dir = await readdir(absolutePath);
      console.log(`You are currently in ${absolutePath}`);
      return false;
    } catch {
      console.log("wrong path");
    }
    return 2;
  } else {
    const relativePath = path.join(cwd, extractPath);
    try {
      const dir = await readdir(relativePath);
      console.log(`You are currently in ${relativePath}`);
      return true;
    } catch {
      console.log("wrong path");
    }
    return 2;
  }
};
