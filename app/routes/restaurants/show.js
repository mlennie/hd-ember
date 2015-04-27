import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function(params) {
    return this.store.fetchById('restaurant', params.restaurant_id);
  },
	
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
