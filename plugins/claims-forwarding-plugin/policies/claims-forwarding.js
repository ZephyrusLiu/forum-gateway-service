const path = require('path');
const logger = require(path.join(__dirname, '../../../utils/logger'));

module.exports = {
  name: 'claims-forwarding',
  policy: (actionParams) => {
    return (req, res, next) => {
      const startTime = Date.now();
      const requestId = req.id || req.headers['x-request-id'] || 'unknown';
      const method = req.method;
      const requestPath = req.path;

      const token = req.egContext.jwt || req.egContext.token;
      
      if (!token) {
        logger.debug('No JWT token found in context for claims forwarding', {
          requestId,
          method,
          path: requestPath,
          policy: 'claims-forwarding'
        });
        return next();
      }

      const payload = token.payload || token;
      const forwardedClaims = {};

      if (payload.userId) {
        req.headers['x-user-id'] = String(payload.userId);
        forwardedClaims.userId = payload.userId;
      }

      if (payload.userType) {
        req.headers['x-user-type'] = String(payload.userType);
        forwardedClaims.userType = payload.userType;
      }

      if (payload.verifiedStatus !== undefined) {
        req.headers['x-verified-status'] = String(payload.verifiedStatus);
        forwardedClaims.verifiedStatus = payload.verifiedStatus;
      }

      const duration = Date.now() - startTime;

      if (Object.keys(forwardedClaims).length > 0) {
        logger.info('Claims forwarded to backend service', {
          requestId,
          method,
          path: requestPath,
          policy: 'claims-forwarding',
          claims: forwardedClaims,
          duration: `${duration}ms`
        });
      } else {
        logger.warn('JWT token found but no claims extracted', {
          requestId,
          method,
          path: requestPath,
          policy: 'claims-forwarding',
          duration: `${duration}ms`
        });
      }

      next();
    };
  }
};
