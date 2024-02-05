import os from "node:os";
import * as readline from "node:readline/promises";
import { list } from "../ls/ls.js";
import path from "node:path";
import { changeDir } from "../cd/cd.js";
import { create } from "../fs/create.js";
import { up } from "../cd/up.js";
import { read } from "../fs/read.js";
import { rename } from "../fs/rename.js";
import { copy } from "../fs/copy.js";
import { remove } from "../fs/delete.js";
import { move } from "../fs/move.js";
import { getOS } from "../os/os.js";
import { calculateHash } from "../hash/hash.js";
import { compress } from "../zip/compress.js";
import { decompress } from "../zip/decompress.js";

const userHomeDir = os.homedir();
let currentDir;

export const startApp = async (username) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  let user;

  if (username.length === 0) {
    user = "Anonymous";
    console.log(`Welcome to the File Manager, ${user}!`);
  } else {
    user = username[0].split("=")[1];
    console.log(`Welcome to the File Manager, ${user}!`);
  }

  currentDir = userHomeDir;

  console.log(`You are currently in ${currentDir}`);

  rl.prompt();

  rl.on("line", async (line) => {
    const extractPath = line.trim().split(" ").slice(1).join(" ");
    switch (line.trim().split(" ")[0]) {
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
      case "add":
        await create(currentDir, extractPath);
        break;
      case "cat":
        read(currentDir, extractPath);
        break;
      case "rn":
        rename(currentDir, extractPath);
        break;
      case "cp":
        copy(currentDir, extractPath);
        break;
      case "mv":
        move(currentDir, extractPath);
        break;
      case "rm":
        remove(currentDir, extractPath);
        break;
      case "os":
        getOS(extractPath, currentDir);
        break;
      case "hash":
        calculateHash(currentDir, extractPath);
        break;
      case "compress":
        compress(currentDir, extractPath);
        break;
      case "decompress":
        decompress(currentDir, extractPath);
        break;
      case ".exit":
        console.log(`Thank you for using File Manager, ${user}, goodbye!`);
        process.exit(0);
      case "cwd":
        console.log(currentDir);
        break;
      default:
        console.log("Invalid input: command not found");
    }
    rl.prompt();
  }).on("close", () => {
    console.log(`Thank you for using File Manager, ${user}, goodbye!`);
    process.exit(0);
  });
};
