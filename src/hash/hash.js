import fs from "fs";
import path from "path";
import crypto from "node:crypto";

export const calculateHash = async (currentDir, pathToFile) => {
  if (pathToFile.startsWith("/")) {
    const absolutePath = path.join(pathToFile);
    try {
      const readStream = fs
        .createReadStream(absolutePath)
        .on("error", () => console.log("Operation failed"));
      const hash = crypto.createHash("sha256").setEncoding("hex");
      readStream.pipe(hash);
      hash.on("finish", () => {
        console.log(hash.read());
        console.log(`You are currently in ${currentDir}`);
      });
    } catch {
      console.log("Operation failed");
    }
  } else {
    const relativePath = path.join(currentDir, pathToFile);
    try {
      const readStream = fs
        .createReadStream(relativePath)
        .on("error", () => console.log("Operation failed"));
      const hash = crypto.createHash("sha256").setEncoding("hex");
      readStream.pipe(hash);
      hash.on("finish", () => {
        console.log(hash.read());
        console.log(`You are currently in ${currentDir}`);
      });
    } catch {
      console.log("Operation failed");
    }
  }
};
