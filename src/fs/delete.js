import fs from "fs/promises";
import path from "path";

export const remove = async (currentDir, pathFromLine) => {
  if (pathFromLine.startsWith("/")) {
    const absolutePath = path.join(pathFromLine);
    try {
      await fs.rm(absolutePath);
      console.log(`You are currently in ${currentDir}`);
    } catch {
      console.log("Operation failed");
    }
  } else {
    const relativePath = path.join(currentDir, pathFromLine);
    try {
      await fs.rm(relativePath);
      console.log(`You are currently in ${currentDir}`);
    } catch {
      console.log("Operation failed");
    }
  }
};
