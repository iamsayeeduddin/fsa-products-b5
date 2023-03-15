const bunyan = require("bunyan");
const path = require("path");
const fs = require("fs");

// const dir = path.join(__dirname, "..", "logs");

// if (!fs.existsSync(dir)) {
//   fs.mkdirSync(dir);
//   if (!fs.existsSync(path.join(dir, "app.log"))) {
//     fs.createWriteStream(path.join(dir, "app.log"));
//     riteStream.end();
//   }
// }
const filePath = path.join(__dirname, "..", "logs", "app.log");

const logger = bunyan.createLogger({
  name: "FSA",
  streams: [
    {
      path: filePath,
    },
  ],
});

module.exports = logger;
