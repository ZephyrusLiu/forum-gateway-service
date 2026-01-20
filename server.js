const expressGateway = require('express-gateway');
const path = require('path');

expressGateway()
  .load(path.join(__dirname, 'config'))
  .run()
  .then(() => {
    console.log('Express Gateway started!');
  })
  .catch(err => {
    console.error('Failed to start gateway:', err);
  });
