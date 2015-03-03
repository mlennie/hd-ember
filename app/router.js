import Ember from 'ember';
import config from './config/environment';
Ember.Route.reopen(
  {
    //initionalize mixpanel on page view
    beforeModel: function(transition) {
      mixpanel.init(config.APP.MIXPANEL_CODE);
      //call mixpanel over https
      mixpanel.set_config({
        secure_cookie: true
      });
    }
  }
);

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('users', function() {
    this.route('edit', { path: '/show' });
    this.route('mes-euros');
    this.route('parrainer-un-ami');
  });
  this.resource('restaurants', function() {
    this.route('show', { path: ':restaurant_id'});
    this.route('search-results');
  });
  this.route('login');
  this.route('register');
  this.route('new-password');
  this.route('edit-password');
  this.route('resend-confirmation');
  this.route('conditions-generales');
  this.route('faq');
  this.route('remerciements');
});

export default Router;
