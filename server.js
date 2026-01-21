const path = require('path');
require('dotenv').config({path : path.resolve(__dirname,'../.env')});

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT env vars');
}


const expressGateway = require('express-gateway');

expressGateway()
  .load(path.join(__dirname, 'config'))
  .run()
  .then(() => {
    console.log('Express Gateway started!');
  })
  .catch(err => {
    console.error('Failed to start gateway:', err);
  });
