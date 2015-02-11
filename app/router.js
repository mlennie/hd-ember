import Ember from 'ember';
import config from './config/environment';
Ember.Route.reopen(
  {
    //add mixpanel page visiting with page name event
    beforeModel: function(transition) {
      this._super(transition);
      return mixpanel.track("visit" , {pageName: transition.targetName});
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
});

export default Router;
