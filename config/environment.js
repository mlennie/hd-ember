/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hd-ember',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    referralAmount: '10',
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


  if (environment === 'development') {
    //initialize mixpanel
    ENV.APP.MIXPANEL_CODE = "71aac3e175ed8f2f524fa6641358284b"
    //ENV.APP.LOG_RESOLVER = true;
    //ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    //ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    //ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.HOST = 'http://localhost:3000'
    ENV.APP.EMBER_URL = 'http://localhost:4200'
    ENV['simple-auth'] = {
      authorizer: 'simple-auth-authorizer:devise',
      crossOriginWhitelist: [ENV.APP.HOST]
    };
    ENV['simple-auth-devise'] = {
      serverTokenEndpoint:  ENV.APP.HOST + '/users/sign_in',
      crossOriginWhitelist: ENV.APP.HOST
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.HOST = 'http://localhost:3000'
    ENV.APP.EMBER_URL = 'http://localhost:4200'
    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    //initialize mixpanel
    ENV.APP.MIXPANEL_CODE = process.env.MIXPANEL_CODE
    ENV.APP.HOST = process.env.API_URL
    ENV.APP.EMBER_URL = process.env.EMBER_URL
    ENV['simple-auth'] = {
      authorizer: 'simple-auth-authorizer:devise',
      crossOriginWhitelist: [ENV.APP.HOST]
    };
    ENV['simple-auth-devise'] = {
      serverTokenEndpoint:  process.env.API_URL + '/users/sign_in',
      crossOriginWhitelist: process.env.API_URL
    };
  }


  return ENV;
};
