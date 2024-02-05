import fs from "fs";
import path from "path";
import { createBrotliCompress } from "node:zlib";

export const compress = async (currentDir, extractPath) => {
  const pathToSourceFile = path.join(currentDir, extractPath.split(" ")[0]);
  const pathToDestinationFile = path.join(extractPath.split(" ")[1]);
  try {
    const readStream = fs
      .createReadStream(pathToSourceFile)
      .on("error", () => console.log("Operation failed"));
    const zip = createBrotliCompress();
    const writeStream = fs
      .createWriteStream(pathToDestinationFile)
      .on("error", () => console.log("Operation failed"));
    readStream
      .pipe(zip)
      .pipe(writeStream)
      .on("finish", () => {
        console.log(`You are currently in ${currentDir}`);
      })
      .on("error", () => console.log("Operation failed"));
  } catch {
    console.log("Operation failed");
  }
};
