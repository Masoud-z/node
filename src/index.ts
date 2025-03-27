import path from "path";
import os from "os";
import fs from "fs";
import Logger from "./logger";

console.log("__dirname: ", __dirname);
console.log("__filename: ", __filename);

const pathObj = path.parse(__filename);

console.log("pathObj: ", pathObj);

console.log("os.totalmem(): ", os.freemem());

fs.readdir("./", (err, files) => {
  if (err) console.log("Error: ", err);
  console.log("files: ", files);
});

const logger = new Logger();

logger.on("MasoudEvent", ({ id, url }) => {
  console.log();
  console.log("+++++++------****------+++++++");
  console.log("MasoudEvent is emitted");
  console.log("id: ", id);
  console.log("url: ", url);
  console.log("+++++++------****------+++++++");
  console.log();
});

logger.log("Hello World!");
