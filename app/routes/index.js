import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller, model) {
    controller.setProperties({
    	registrationSuccessful: false,
    	registrationFailed: false
    });
    this._super(controller, model);
  },
  resetController: function (controller, isExiting, transition) {
    if (isExiting) {
      // isExiting would be false if only the route's model was changing
      //reset messages
      controller.setProperties({
	    	confirmation_success: null,
	    	confirmation_fail: null,
	    	already_logged_in: null
    	});
    }
  }
});
