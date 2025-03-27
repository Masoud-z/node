import EventEmitter from "events";

class Logger extends EventEmitter {
  url = "https://testUtl.com";
  log(message: string) {
    console.log();
    console.log("+++++++------**Logger Class**------+++++++");
    console.log(message);
    console.log("+++++++------****************------+++++++");
    console.log();
    this.emit("MasoudEvent", { id: 1, url: "https://test.com" });
  }
}

export default Logger;
