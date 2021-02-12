exports.ENV_PORT = process.env.PORT || 8080;
exports.ENVIRONMENT = process.env.NODE_ENV !== 'production';

const logLevels = {
  DEBUG: 0,
  INFO: 1,
  ERROR: 2,
  FATAL: 3,
};
exports.LOG_LEVELS = logLevels;

exports.DEFAULT_LOG_LEVEL =
  process.env.DEFAULT_LOG_LEVEL || this.LOG_LEVELS.INFO;
