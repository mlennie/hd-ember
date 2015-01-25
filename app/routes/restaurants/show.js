import Ember from 'ember';

export default Ember.Route.extend({
	resetController: function (controller, isExiting, transition) {
    if (isExiting) {
      // isExiting would be false if only the route's model was changing
      controller.setProperties({
      	date: null,
      	time: null,
      	number: null, 
      	name: null
      })
    }
  },
	setupController: function(controller, model) {
    controller.set('showReserveButton', true);
    this._super(controller, model);
  }
});
