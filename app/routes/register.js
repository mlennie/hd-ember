import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

	setupController: function(controller) {
    controller.setProperties({
    	registrationSuccessful: false,
    	registrationFailed: false,
    	genderBlank: false,
    	passwordMismatch: false,
    	passwordTooShort: false,
      isLoading: false
    });
  }
});