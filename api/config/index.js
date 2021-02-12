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

const httpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  TECHNIAL_ERROR: 500,
};
exports.HTTP_STATUSCODES = httpStatusCodes;

const errorMessages = {
  ERROR_INVALIDBODY: 'Request Body is not valid',
  ERROR_INVALIDTOEMAIL: 'Email Id(s) in To is invalid',
  ERROR_INVALIDCCEMAIL: 'Email Id(s) in Cc is invalid',
  ERROR_INVALIDBCCEMAIL: 'Email Id(s) in BCc is invalid',
  ERROR_INVALIDSUBJECT: 'Email Subject is Mandatory',
};

exports.ERROR_INPUTINVALID = errorMessages;
