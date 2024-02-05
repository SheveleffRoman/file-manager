import fs from "fs/promises";

export const list = async (currentDir) => {
  try {
    const listOfFiles = await fs.readdir(currentDir, { withFileTypes: true });
    const directories = [];
    const files = [];

    for (let item of listOfFiles) {
      if (item.isDirectory()) {
        directories.push(item.name);
      } else {
        files.push(item.name);
      }
    }

    directories.sort();
    files.sort();

    const tableData = [];

    directories.forEach((directory) =>
      tableData.push({ Name: directory, Type: "Directory" })
    );
    files.forEach((file) => tableData.push({ Name: file, Type: "File" }));

    console.table(tableData);
    console.log(`You are currently in ${currentDir}`);
  } catch {
    console.log("Operation failed");
  }
};
