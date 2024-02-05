import os from "os";

export const getOS = (command, currentDir) => {
  switch (command) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      console.log(`You are currently in ${currentDir}`);
      break;
    case "--cpus":
      console.log(os.cpus());
      console.log(`You are currently in ${currentDir}`);
      break;
    case "--homedir":
      console.log(os.homedir());
      console.log(`You are currently in ${currentDir}`);
      break;
    case "--username":
      console.log(os.userInfo().username);
      console.log(`You are currently in ${currentDir}`);
      break;
    case "--architecture":
      console.log(os.arch());
      console.log(`You are currently in ${currentDir}`);
      break;
    default:
      console.log("Invalid input");
  }
};
