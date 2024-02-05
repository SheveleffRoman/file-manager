import path from "path";
import { createReadStream, createWriteStream } from "node:fs";
import { remove } from "./delete.js";

export const move = async (currentDir, paths) => {
  const pathArr = paths.split(" ");
  const pathToFile = path.join(currentDir, pathArr[0]);
  let newPath;
  if (pathArr[1].startsWith("/")) {
    newPath = path.join(pathArr[1], pathArr[0]);
  } else {
    newPath = path.join(currentDir, pathArr[1], pathArr[0]);
  }

  try {
    const readStream = createReadStream(pathToFile).on("error", () =>
      console.log("Operation failed")
    );
    const writeStream = createWriteStream(newPath).on("error", () =>
      console.log("Operation failed")
    );
    readStream.pipe(writeStream);
    await remove(currentDir, pathToFile);
  } catch {
    console.log("Operation failed");
  }
};
