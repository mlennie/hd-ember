import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('protected');
  this.route('login', { path: '/login/:confirmation' });
  this.route('register');
});

export default Router;
