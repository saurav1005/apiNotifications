const express = require('express');
const bodyparser = require('body-parser');
const { ENV_PORT } = require('./api/config');
const routes = require('./api/routes');
const logger = require('morgan');
const { isInfoEnabled, log } = require('./api/utils/logger');

const app = express();
app.use(bodyparser.json());
app.use(logger('combined'));

app.use('/api', routes);

app.listen(ENV_PORT, () => {
  if (isInfoEnabled()) {
    log(`Notifications Service running on port ${ENV_PORT}`);
  }
});
