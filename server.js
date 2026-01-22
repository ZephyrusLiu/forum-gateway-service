const path = require('path');
require('dotenv').config({path : path.resolve(__dirname,'../.env')});

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable');
}
const logger = require('./utils/logger');
const expressGateway = require('express-gateway');

const port = process.env.PORT || 8080;
const adminPort = process.env.ADMIN_PORT || 9876;

logger.info('Starting Express Gateway', {
  port,
  adminPort,
  nodeEnv: process.env.NODE_ENV || 'development'
});

expressGateway()
  .load(path.join(__dirname, 'config'))
  .run()
  .then(() => {
    logger.info('Express Gateway started successfully', {
      httpPort: port,
      adminPort: adminPort,
      timestamp: new Date().toISOString()
    });
  })
  .catch(err => {
    logger.error('Failed to start gateway', {
      error: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString()
    });
    process.exit(1);
  });

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received, shutting down gracefully');
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', {
    reason: reason instanceof Error ? reason.message : reason,
    stack: reason instanceof Error ? reason.stack : undefined,
    promise: promise.toString()
  });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', {
    error: error.message,
    stack: error.stack
  });
  process.exit(1);
});
