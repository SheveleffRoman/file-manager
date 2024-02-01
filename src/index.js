import { startApp } from "./start/start.js";

let parsedArgs = process.argv.slice(2);
console.log(parsedArgs);

await startApp(parsedArgs);
