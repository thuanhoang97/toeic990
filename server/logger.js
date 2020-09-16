const path = require('path');
const winston = require('winston');

const { combine, timestamp, label, printf, colorize } = winston.format;

const consoleFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label}][${timestamp}] ${level}: ${message}`;
});

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
});

module.exports = function (callerFile) {
  return winston.createLogger({
    level: 'debug',
    transports: [
      new winston.transports.Console({
        format: combine(
          colorize(),
          label({ label: path.basename(callerFile) }),
          timestamp(),
          consoleFormat
        ),
      }),
    ],
  });
};
