import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: "restaurants/show",
  show: Ember.computed.alias("controllers.restaurants/show"),
	//computed properties
	//check if time selected equals time button 
	//so can highlight if so
	isSelected: function() {
		alert(this.get('model'));
		alert(this.get('show.time'));
		return this.get('model') == this.get('show.time');
	}.observes('show'),
});