import Ember from 'ember';
import TrackingMixin from './mixin/tracking_mixin'
import config from './config/environment';

var Router = Ember.Router.extend(TrackingMixin,{
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
});

export default Router;
