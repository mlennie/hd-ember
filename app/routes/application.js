import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

	model: function(){
		return this.store.find('restaurant');
	},

	actions: {
		sessionAuthenticationSucceeded: function(error) {
			
			var session = window.localStorage.getItem('ember_simple_auth:session');
			if (session !== null) {
				var parsed_session = JSON.parse(session);
				if (parsed_session["is_owner"] == true) {
					this.transitionTo('users.reservations');
				} else {
					this.transitionTo('index');
				}
			}	else {
				this.transitionTo('index');
			}
    }
	}
});
