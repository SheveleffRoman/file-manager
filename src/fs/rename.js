import fs from "fs/promises";
import path from "path";

export const rename = async (currentDir, pathFromLine) => {
  const pathArr = pathFromLine.split(" ");
  const pathToOld = path.join(currentDir, pathArr[0]);
  const pathToNew = path.join(currentDir, pathArr[1]);

  try {
    await fs.rename(pathToOld, pathToNew);
    console.log(`You are currently in ${currentDir}`);
  } catch {
    console.log("Operation failed");
  }
};
