import os from "node:os";
import * as readline from "node:readline/promises";
import { list } from "../ls/ls.js";
import path from "node:path";
import { changeDir } from "../cd/cd.js";
import { create } from "../fs/create.js";
import { up } from "../cd/up.js";
import { read } from "../fs/read.js";

const userHomeDir = os.homedir();
let currentDir;

export const startApp = async (username) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  if (username.length === 0) {
    console.log(`Welcome to the File Manager, anonymous!`);
  } else {
    console.log(`Welcome to the File Manager, ${username}!`);
  }

  currentDir = userHomeDir;

  console.log(`You are currently in ${currentDir}`);

  rl.prompt();

  rl.on("line", async (line) => {
    const extractPath = line.trim().split(" ").slice(1).join(" ");
    switch (line.trim().split(" ")[0]) {
      case "add":
        await create(currentDir, line.trim());
        console.log(`You are currently in ${currentDir}`);
        break;
      case "ls":
        console.log(currentDir);
        list(currentDir);
        break;
      case "cd":
        const res = await changeDir(currentDir, line);
        if (res === true) {
          currentDir = path.join(currentDir, extractPath);
        } else if (res === 2) {
          currentDir = currentDir;
        } else {
          currentDir = extractPath;
        }
        break;
      case "up":
        currentDir = currentDir.split("/").slice(0, -1).join("/");
        if (currentDir.length === 0) {
          currentDir = "/";
        }
        up(currentDir);
        break;
      case "cat":
        read(currentDir, extractPath);
        break;
      case ".exit":
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
      case "cwd":
        console.log(currentDir);
        break;
      default:
        console.log("Invalid input: command not found");
    }
    rl.prompt();
  }).on("close", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });
};
