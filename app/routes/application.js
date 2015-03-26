import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
	model: function(){
		return this.store.find('restaurant');
	},

	actions: {
		sessionAuthenticationSucceeded: function(error) {
			if (this.get('session.is_owner')) {
      	this.transitionTo('users.reservations');
      }
    }
	}
});
