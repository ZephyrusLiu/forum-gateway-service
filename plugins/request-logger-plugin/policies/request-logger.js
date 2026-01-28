const path = require('path');
const logger = require(path.join(__dirname, '../../../utils/logger'));

module.exports = {
  name: 'request-logger',
  policy: (actionParams) => {
    const service = actionParams?.service || 'gateway';
    return (req, res, next) => {
      logger.info(`${req.method} ${req.originalUrl || req.url}`, { service });
      next();
    };
  }
};
