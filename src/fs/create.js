import fs from "fs/promises";
import path from "path";

export const create = async (currentDir, pathToFile) => {
  let createPath;
  if (pathToFile.startsWith("/")) {
    createPath = path.join(pathToFile);
  } else {
    createPath = path.join(currentDir, pathToFile);
  }
  try {
    await fs.writeFile(createPath, "", { flag: "wx" });
    console.log(`You are currently in ${currentDir}`);
  } catch {
    console.log("Operation failed");
  }
};
