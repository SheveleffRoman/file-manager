import fs from "fs";
import path from "path";
import { createReadStream } from "node:fs";

export const read = async (pathToFile, filename) => {
  const createPath = path.join(pathToFile, filename);
  try {
    const readStream = createReadStream(createPath);
    readStream.setEncoding("utf-8");
    readStream.on("data", (data) => {
      console.log(data);
    });
    readStream.on("error", () => {
      console.log("Operation failed");
    });
  } catch (err) {
    console.log("Operation failed");
  }
};
