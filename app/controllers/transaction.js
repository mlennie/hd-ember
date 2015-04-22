import Ember from 'ember';

export default Ember.ObjectController.extend({
	
	//computed properties
	reservation: function() {
		if (this.get('itemable_type') == "Reservation") {
			return this.store.getById('reservation', this.get('itemable_id'));
		} else {
			return null;
		}
	}.property('model'),

	restaurant_name: function() {
		if (this.get('reservation') !== null) {
			return this.get('reservation.restaurant.name');
		} else {
			return 'Bonus';
		}
	}.property('model'),

	date: function() {
		//add french months
		var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
								  "Juillet", "Août", "Septembre", "Octobre", "Novembre", 
								  "Décembre"];

		//add french days
		var days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", 
								  "Dimanche"];
		if (this.get('reservation') !== null) {
			var time = this.get('reservation.time');
		} else {
			var time = this.get('created_at');
		}
		return days[time.getDay()] + ' ' +
					 time.getDate().toString() + ' ' + 
					 (months[time.getMonth()]) + ' ' +
					 time.getFullYear().toString();
	}.property('model'),

	earnings: function() {
		var amount = this.get('final_balance') - this.get('original_balance');
		return amount > 0 ? '+' + amount : amount;
	}.property('model')

});