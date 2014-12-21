import Ember from 'ember';

export default Ember.Controller.extend({
	restaurants: function() {
		return this.modelFor('application');
	}
});
