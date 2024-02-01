import fs from "fs/promises";
import path from "path";

export const create = async (pathToFile, filename) => {
  const fileName = filename.split(" ").slice(1).join(" ");
  const createPath = path.join(pathToFile, fileName);
  try {
    await fs.writeFile(createPath, "", { flag: "wx" });
  } catch {
    console.log("Operation failed");
  }
};
