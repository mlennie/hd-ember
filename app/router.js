import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('users', function() {
    this.route('new');
    this.route('edit', { path: ':user_id/edit' });
    this.route('show', { path: ':user_id' });
  });
  this.route('protected');
  this.route('login', { path: '/login/:confirmation' });
  this.route('register');
  this.route('results');
});

export default Router;
