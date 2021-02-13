const validator = require('../utils/validator');
const errorHandler = require('../utils/errorHandler');
const { HTTP_STATUSCODES, ERROR_INPUTINVALID } = require('../config/index');
const logger = require('../utils/logger');

function isValidEmail(emailArray) {
  let validEmail = true;
  emailArray.forEach((email) => {
    if (!validator.isEmailValid(email)) {
      validEmail = false;
    }
  });
  return validEmail;
}

function validateToEmail(toEmail) {
  if (
    !validator.isValidArray(toEmail) ||
    toEmail.length === 0 ||
    !isValidEmail(toEmail)
  ) {
    throw new Error(ERROR_INPUTINVALID.ERROR_INVALIDTOEMAIL);
  }
}

function validateCcEmail(ccEmail) {
  if (
    ccEmail !== undefined &&
    (!validator.isValidArray(ccEmail) ||
      (ccEmail.length > 0 && !isValidEmail(ccEmail)))
  ) {
    throw new Error(ERROR_INPUTINVALID.ERROR_INVALIDCCEMAIL);
  }
}

function validateBccEmail(bccEmail) {
  if (
    bccEmail !== undefined &&
    (!validator.isValidArray(bccEmail) ||
      (bccEmail.length > 0 && !isValidEmail(bccEmail)))
  ) {
    throw new Error(ERROR_INPUTINVALID.ERROR_INVALIDBCCEMAIL);
  }
}

function validateInputFields(requestBody) {
  try {
    validateToEmail(requestBody.to);
    validateCcEmail(requestBody.cc);
    validateBccEmail(requestBody.bcc);
  } catch (err) {
    throw err;
  }
}

function validateNotificationsInput(req, res, next) {
  try {
    logger.log(
      'Before Starting validations',
      'notificationsMiddleware',
      'validateNotificationsInput'
    );
    const requestBody = req.body;
    if (validator.isEmpty(requestBody)) {
      const error = errorHandler.createErrorResponse(
        HTTP_STATUSCODES.BAD_REQUEST,
        'Bad Request',
        ERROR_INPUTINVALID.ERROR_INVALIDBODY
      );
      return next(error);
    }
    validateInputFields(requestBody);
    return next();
  } catch (err) {
    const error = errorHandler.createErrorResponse(
      HTTP_STATUSCODES.BAD_REQUEST,
      'BAD_REQUEST',
      err.message
    );
    return next(error);
  }
}

exports.validateNotificationsInput = validateNotificationsInput;
