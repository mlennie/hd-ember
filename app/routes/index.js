import Ember from 'ember';

export default Ember.Route.extend({
  //redirect owner if logged in
  beforeModel: function(transition) {
    
    var session = window.localStorage.getItem('ember_simple_auth:session');
    if (session !== null) {
      var parsed_session = JSON.parse(session);
      if (parsed_session["is_owner"] == true) {
        this.transitionTo('users.reservations');
      } else {
        this.transitionTo('index');
      }
    } else {
      this.transitionTo('index');
    }
  },
	setupController: function(controller, model) {
    controller.controllerFor('application').set('showTopSearch', false);
    controller.setProperties({
    	registrationSuccessful: false,
    	registrationFailed: false,
    	date: null,
    	time: null,
    	number: null
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
