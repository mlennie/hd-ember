import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller, model) {
    controller.setProperties({
    	isLoading: false,
      reservationSuccess: false,
      reservationFail: false,
      showDiscountError: false,
      showNoAvailibilitiesError: false
    });
    this._super(controller, model);
  }
});
