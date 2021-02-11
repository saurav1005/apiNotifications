const express = require('express');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  console.log('Sample API');
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Notifications Service running on port ${port}`);
});
