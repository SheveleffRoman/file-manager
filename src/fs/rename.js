import fs from "fs/promises";
import path from "path";

export const rename = async (currentDir, pathFromLine) => {
  const pathArr = pathFromLine.split(" ");
  let pathToOld;
  let pathToNew;
  if (pathArr[0].startsWith("/") && pathArr[0].startsWith("/")) {
    pathToOld = path.join(pathArr[0]);
    pathToNew = path.join(pathArr[1]);
  } else {
    pathToOld = path.join(currentDir, pathArr[0]);
    pathToNew = path.join(currentDir, pathArr[1]);
  }

  try {
    await fs.rename(pathToOld, pathToNew);
    console.log(`You are currently in ${currentDir}`);
  } catch {
    console.log("Operation failed");
  }
};
