import path from "path";
import { createReadStream } from "node:fs";

export const read = async (currentDir, pathToFile) => {
  let createPath;
  if (pathToFile.startsWith("/")) {
    createPath = path.join(pathToFile);
  } else {
    createPath = path.join(currentDir, pathToFile);
  }
  try {
    const readStream = createReadStream(createPath).on("error", () =>
      console.log("Operation failed")
    );
    readStream.setEncoding("utf-8");
    readStream.on("data", (data) => {
      console.log(data);
    });
  } catch (err) {
    console.log("Operation failed");
  }
};
