import fs from "fs";
import path from "path";
import { createBrotliDecompress } from "node:zlib";

export const decompress = async (currentDir, extractPath) => {
  const pathToSourceFile = path.join(currentDir, extractPath.split(" ")[0]);
  const pathToDestinationFile = path.join(extractPath.split(" ")[1]);
  try {
    const readStream = fs
      .createReadStream(pathToSourceFile)
      .on("error", () => console.log("Operation failed"));
    const unzip = createBrotliDecompress();
    const writeStream = fs
      .createWriteStream(pathToDestinationFile)
      .on("error", () => console.log("Operation failed"));
    readStream
      .pipe(unzip)
      .pipe(writeStream)
      .on("finish", () => {
        console.log(`You are currently in ${currentDir}`);
      })
      .on("error", () => console.log("Operation failed"));
  } catch {
    console.log("Operation failed");
  }
};
