import fs from "fs/promises";

export const list = async (pathToDir) => {
  try {
    const listOfFiles = await fs.readdir(pathToDir);
    console.log(listOfFiles);
  } catch {
    console.log("List operation failed");
  }
};
