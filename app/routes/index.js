import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller, model) {
    controller.set('registrationSuccessful', false);
    controller.set('registrationFailed', false);
    this._super(controller, model);
  }
});
