import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller, model) {
    controller.set('registrationSuccessful', false);
    controller.set('registrationFailed', false);
    controller.setProperties({
    	date: null,
    	time: null,
    	number: null
    });
    this._super(controller, model);
  }
});
