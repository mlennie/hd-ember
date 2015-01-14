/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hd-ember',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['simple-auth'] = {
    authorizer: 'simple-auth-authorizer:devise'
  };


  if (environment === 'development') {
    //ENV.APP.LOG_RESOLVER = true;
    //ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    //ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    //ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.HOST = 'http://localhost:3000'
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.HOST = 'http://localhost:3000'
    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.HOST = ENV['API_URL']
    ENV['simple-auth-devise'] = {
      serverTokenEndpoint:  ENV['API_URL'] + 'users/sign_in',
      crossOriginWhitelist: [ENV['API_URL']]
    };
  }

  if (environment === 'staging') {
    ENV.APP.HOST = 'https://hdrailsstag.herokuapp.com'
    ENV['simple-auth-devise'] = {
      serverTokenEndpoint:  'https://hdrailsstag.herokuapp.com/users/sign_in',
      crossOriginWhitelist: ['https://hdrailsstag.herokuapp.com/']
    };
  }

  return ENV;
};
