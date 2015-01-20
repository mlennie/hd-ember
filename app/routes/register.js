import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
	setupController: function(controller, model) {
    controller.setProperties({
    	registrationSuccessful: false,
    	registrationFailed: false,
    	genderBlank: false,
    	passwordMismatch: false,
    	passwordTooShort: false,
        isLoading: false
    });
    this._super(controller, model);
  }
});