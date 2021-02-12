const express = require('express');
const router = express.Router();
const notificationsRouter = require('./notificationsRouter');

router.use('/v1/notifications', notificationsRouter);

router.use((req, res, next) => {
  const error = new Error('Resource Not Found');
  error.status = 404;
  error.code = 404;
  next(error);
});

router.use((error, req, res, next) => {
  return res
    .status(error.code || 500)
    .json({ status: error.status, message: error.message });
});

module.exports = router;
