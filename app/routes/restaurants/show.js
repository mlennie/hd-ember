import Ember from 'ember';

export default Ember.Route.extend({
	resetController: function (controller, isExiting) {
    if (isExiting) {
      // isExiting would be false if only the route's model was changing
      controller.setProperties({
      	date: null,
      	time: null,
      	number: null, 
      	name: null
      });
    }
  },
	setupController: function(controller, model) {
    controller.setProperties({
    	showNoServiceMessage: false
    });
    this._super(controller, model);
  }
});
