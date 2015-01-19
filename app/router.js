import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  notifyGoogleAnalytics: function() {
    return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')
});

Router.map(function() {
  this.resource('users', function() {
    this.route('edit', { path: ':user_id/edit' });
    this.route('show', { path: ':user_id' });
    this.route('mes-euros', { path: ':user_id/mes-euros' });
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
});

export default Router;
