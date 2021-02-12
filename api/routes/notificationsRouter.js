const express = require('express');
const router = express.Router();

const notificationsController = require('../controllers/notificationsController');
const notificationsMiddleware = require('../middleware/notificationsMiddleware');

router.post(
  '/email',
  notificationsMiddleware.validateNotificationsInput,
  notificationsController.sendEmail
);

module.exports = router;
