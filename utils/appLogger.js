const bunyan = require("bunyan");
const path = require("path");
const fs = require("fs");

const dir = path.join(__dirname, "logs");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
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
