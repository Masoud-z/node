const url = "https://testUtl.com";

export function log(message: string) {
  console.log(message);
}

module.exports.log = log;
