var winston = require("winston");

module.exports = function() {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
  });
  return logger;
};
