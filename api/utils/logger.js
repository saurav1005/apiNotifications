//TODO Placeholder implementation of modifying logs with date-timestamp and invoking via interceptors
const { LOG_LEVELS, DEFAULT_LOG_LEVEL } = require('../config');

exports.log = (message, file) => {
  if (message && file) {
    console.log(`${file} | ${message}`);
  } else if (message) {
    console.log(`${message}`);
  }
};

exports.isDebugEnabled = () => {
  return LOG_LEVELS.DEBUG <= DEFAULT_LOG_LEVEL;
};

exports.isInfoEnabled = () => {
  return LOG_LEVELS.INFO <= DEFAULT_LOG_LEVEL;
};

exports.isErrorEnabled = () => {
  return LOG_LEVELS.ERROR <= DEFAULT_LOG_LEVEL;
};
