module.exports = {
    version: '1.0.0',
    init: (pluginContext) => {
      pluginContext.registerPolicy(require('./policies/request-logger'));
    },
    policies: ['request-logger'],
    schema: {
      $id: 'http://express-gateway.io/schemas/plugin/request-logger-plugin.json'
    }
  };
  