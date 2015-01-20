import Ember from 'ember';

export default Ember.Route.extend({
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
  }
});
