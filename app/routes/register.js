import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  beforeModel: function() {

    //add redirect to index if already logged in
    if (this.session.isAuthenticated) {

      //send already logged in param to show message on index  
      this.transitionTo('index', {queryParams: {already_logged_in: true}});
    }
  },

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