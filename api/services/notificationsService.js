const mailGunService = require('./mailGunService');
const logger = require('../utils/logger');

const abstractService = {
  serviceProvider: 'PRIMARY',
  failThreshold: 3,
  failCount: 0,
  successThreshold: 3,
  successCount: 0,
  nextTry: Date.now(),
  nextTryTimeInterval: 60000,
};

switchServiceProvider = async (requestBody) => {
  abstractService.serviceProvider = 'SECONDARY';
  logger.log(
    'Service provider switched to SECONDARY',
    'notificationsService',
    'switchServiceProvider'
  );

  return await sendSendGridService(requestBody);
};

retryService = async (requestBody) => {
  try {
    if (logger.isInfoEnabled()) {
      logger.log(
        'MailGun Retry Service Invoked with fail count ' +
          abstractService.failCount,
        'notificationsService',
        'switchServiceProvider'
      );
    }

    if (abstractService.failCount > abstractService.failThreshold) {
      abstractService.nextTry =
        Date.now() + abstractService.nextTryTimeInterval;
      return await switchServiceProvider(requestBody);
    } else {
      return await sendMailGunService(requestBody);
    }
  } catch (err) {
    throw err;
  }
};

sendMailGunService = async (requestBody) => {
  try {
    return await mailGunService.sendMailGunNotification(requestBody);
  } catch (err) {
    abstractService.failCount++;
    return retryService(requestBody);
  }
};

//TODO - Implementation for sendGrid could not be completed due to Account set up
sendSendGridService = async (requestBody) => {
  if (logger.isInfoEnabled()) {
    logger.log(
      'Send Grid Service Invoked ',
      'notificationsService',
      'sendSendGridService'
    );
  }
  try {
    return await {
      code: 200,
      status: 'Ok',
      message: 'Mail Sent Successfully',
    };
  } catch (err) {
    throw new Error('Technical Error');
  }
};

exports.sendEmailService = async (requestBody) => {
  try {
    if (logger.isInfoEnabled()) {
      logger.log(
        'Inside Send Email Service ',
        'notificationsService',
        'sendSendGridService'
      );
    }
    if (abstractService.serviceProvider === 'PRIMARY') {
      return await sendMailGunService(requestBody);
    } else if (abstractService.nextTry <= Date.now()) {
      abstractService.failCount = 0;
      return await sendMailGunService(requestBody);
    } else {
      return await sendSendGridService(requestBody);
    }
  } catch (err) {
    throw err;
  }
};
