import path from "path";
import os from "os";
import fs from "fs";
import { log } from "./logger";
import EventEmitter from "events";

log("Hello World");

console.log("__dirname: ", __dirname);
console.log("__filename: ", __filename);

const pathObj = path.parse(__filename);

console.log("pathObj: ", pathObj);

console.log("os.totalmem(): ", os.freemem());

fs.readdir("./", (err, files) => {
  if (err) console.log("Error: ", err);
  console.log("files: ", files);
});

const emitter = new EventEmitter();

console.log("emitter: ", emitter);

emitter.on("MasoudEvent", ({ id, url }) => {
  console.log();
  console.log("+++++++------****------+++++++");
  console.log("MasoudEvent is emitted");
  console.log("id: ", id);
  console.log("url: ", url);
  console.log("+++++++------****------+++++++");
  console.log();
});

emitter.emit("MasoudEvent", { id: 1, url: "https://test.com" });
