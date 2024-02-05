import os from "os";

export const getOS = (command, currentDir) => {
  switch (command) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      console.log(`You are currently in ${currentDir}`);
      break;
    case "--cpus":
      getCPUS();
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

const getCPUS = () => {
  const data = os.cpus().map((processor) => ({
    Model: processor.model,
    "Clock rate": `${(processor.speed / 1000).toFixed(2)} GHz`,
  }));

  console.log(`\nOverall amount of CPUS: ${os.availableParallelism()}`);

  data.forEach((data, i) => {
    console.log(`\nCPU ${1 + i++}:`);

    for (let [key, value] of Object.entries(data)) {
      console.log(`${key} is ${value}`);
    }
  });
};
