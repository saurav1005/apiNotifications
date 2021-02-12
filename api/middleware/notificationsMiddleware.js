function validateNotificationsInput(req, res, next) {
  try {
    next();
  } catch (err) {
    next(err);
  }
}

exports.validateNotificationsInput = validateNotificationsInput;
