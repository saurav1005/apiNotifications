const httpService = require('./common/httpService');
const FormData = require('form-data');
const logger = require('../utils/logger');
const {
  MAILGUN_API_KEY,
  MAILGUN_EMAILURL,
  MAILGUN_FROMUSER,
  MAILGUN_MSGS,
} = require('../config');

exports.sendMailGunNotification = async (body) => {
  try {
    const formData = createFormData(body);
    const headers = createMailGunHeaders(formData);
    if (logger.isDebugEnabled()) {
      logger.log(
        'URL is ' + MAILGUN_EMAILURL,
        'mailGunService',
        'sendMailGunNotification'
      );
      logger.log(
        'Headers >> ' + JSON.stringify(headers),
        'mailGunService',
        'sendMailGunNotification'
      );
      logger.log(
        'Body >> ' + JSON.stringify(formData),
        'mailGunService',
        'sendMailGunNotification'
      );
    }
    const sendEmailResp = await httpService.postNotificationFetch(
      MAILGUN_EMAILURL,
      formData,
      headers
    );
    logger.log(
      'sendEmailResp is ' + JSON.stringify(sendEmailResp),
      'mailGunService',
      'sendMailGunNotification'
    );
    if (sendEmailResp) {
      if (sendEmailResp.status >= 500) {
        throw new Error('Technical Error');
      }
      if (sendEmailResp.status >= 400) {
        return {
          code: 400,
          status: sendEmailResp.statusText,
          message: MAILGUN_MSGS.ERROR_INVALIDMAILGUNRESP,
        };
      }
      if (sendEmailResp.status >= 200) {
        return {
          code: 200,
          status: sendEmailResp.statusText,
          message: MAILGUN_MSGS.SUCCESS_MAILGUNRESP,
        };
      }
    }
    return 'Failure';
  } catch (err) {
    logger.log(err, 'mailGunService', 'sendMailGunNotification');
    throw new Error(err);
  }
};

function createMailGunHeaders(formData) {
  let username = 'api';
  let password = MAILGUN_API_KEY;

  const token = Buffer.from(`${username}:${password}`, 'utf8').toString(
    'base64'
  );
  return {
    Authorization: `Basic ${token}`,
    //  'Content-Type': 'multipart/form-data; boundary=',
  };
}

function parseEmail(emailArr) {
  let emailString = '';
  emailArr.forEach((email) => {
    emailString += email + ',';
  });
  emailString = emailString.replace(/,\s*$/, '');
  return emailString;
}

function createFormData(body) {
  let data = new FormData();
  data.append('from', MAILGUN_FROMUSER);
  data.append('to', parseEmail(body.to));
  if (body.cc && body.cc.length > 0) {
    data.append('cc', parseEmail(body.cc));
  }
  if (body.bcc && body.bcc.length > 0) {
    data.append('bcc', parseEmail(body.bcc));
  }
  data.append('subject', body.subject || '');
  data.append('text', body.text || '');
  return data;
}
