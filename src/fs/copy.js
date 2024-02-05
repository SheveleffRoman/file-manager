import path from "path";
import { createReadStream, createWriteStream } from "node:fs";

export const copy = async (currentDir, paths) => {
  const pathArr = paths.split(" ");
  let pathToFile;
  let newPath;

  if (pathArr[0].startsWith("/") && pathArr[0].startsWith("/")) {
    pathToFile = path.join(pathArr[0]);
    newPath = path.join(pathArr[1], pathArr[0].split("/").slice(-1).join());
  } else {
    pathToFile = path.join(currentDir, pathArr[0]);
    newPath = path.join(pathArr[1], pathArr[0]);
  }

  try {
    const readStream = createReadStream(pathToFile).on("error", () =>
      console.log("Operation failed")
    );
    const writeStream = createWriteStream(newPath).on("error", () =>
      console.log("Operation failed")
    );
    readStream
      .pipe(writeStream)
      .on("finish", () => console.log(`You are currently in ${currentDir}`));
  } catch {
    console.log("Operation failed");
  }
};
