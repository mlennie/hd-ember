import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller, model) {
    controller.set('success', false);
    controller.set('fail', false);
    this._super(controller, model);
  }
});
