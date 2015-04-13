import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model: function() {

		//look at local storage to see if user is restaurant owner and if so 
		//get reservations for that owner
		var session = window.localStorage.getItem('ember_simple_auth:session');
		var parsed_session = JSON.parse(session);

		if (parsed_session["is_owner"]) {
    	return this.store.find('reservation', { finished: "true" });
    }
  }
});
