module.exports = {
  version: '1.0.0',
  init: (pluginContext) => {
    pluginContext.registerPolicy(require('./policies/claims-forwarding'));
  },
  policies: ['claims-forwarding'],
  schema: {
    $id: 'http://express-gateway.io/schemas/plugin/claims-forwarding-plugin.json'
  }
};
