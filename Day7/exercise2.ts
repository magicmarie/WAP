import os from "node:os";

async function checkSystem(): Promise<string> {
  return new Promise((resolve, reject) => {
    const memSize = os.totalmem() / (1024 ** 3);
    const cpuCores = os.cpus().length;
    console.log(`Total Memory: ${memSize} GB`);
    console.log(`CPU Cores: ${cpuCores}`);

    if (memSize < 8) {
      reject("You need at least 8 GB of RAM");
    } else if (cpuCores < 4) {
      reject("Processor must have at least 4 cores");
    } else {
      resolve("System is checked successfully.");
    }
  });
}

checkSystem()
    .then(message => console.log(message))
    .catch(error => console.error("Error:", error));
