const notificationsService = require('../services/notificationsService');
const validator = require('../utils/validator');
const errorHandler = require('../utils/errorHandler');
const { HTTP_STATUSCODES, ERROR_INPUTINVALID } = require('../config/index');

exports.sendEmail = async (req, res, next) => {
  try {
    const requestBody = req.body;
    const emailStatus = await notificationsService.sendEmailService(
      requestBody
    );
    res
      .status(emailStatus.code)
      .json({ status: emailStatus.status, message: emailStatus.message });
  } catch (err) {
    throw err;
  }
};
