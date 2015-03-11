import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition) {

    //add redirect to index if already logged in
    if (this.session.isAuthenticated) {

      //send confirmation succeeded param and already logged in param 
      //if confirming when already logged in to show message on index
      if (transition.queryParams.confirmation_success === 'true') {
        this.transitionTo('index', {queryParams: {confirmation_success: true, already_logged_in: true}});

      //send confirmation failed param and already logged in param
      //if confirming when already logged in to show message on index  
      } else if (transition.queryParams.confirmation_fail === 'true') {
        this.transitionTo('index', {queryParams: {confirmation_fail: true, already_logged_in: true}});

      //send only already logged in param to show message on index  
      } else {
        this.transitionTo('index', {queryParams: {already_logged_in: true}});
      }
    }
  },

	model: function(params) {
    this.set('params', params);
  },

  setupController: function(controller, model) {
    controller.setProperties({
    	params: this.get('params'),
    	loginError: false,
    	isLoading: false
    });
    this._super(controller, model);
  },

  resetController: function (controller, isExiting, transition) {
    if (isExiting) {
      // isExiting would be false if only the route's model was changing
      //reset messages
      controller.setProperties({
        editSuccess: false
      });
    }
  }
});
