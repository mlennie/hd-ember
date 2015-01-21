export default {
  name: 'cookie-initializer',
  after: ['cookie'],

  initialize: function(container, app) {
    app.inject('controller', 'cookie', 'cookie:main');
    app.inject('route', 'cookie', 'cookie:main');
    app.inject('view', 'cookie', 'cookie:main');
  }
};