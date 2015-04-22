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

		//add extra zero to minutes if less than 10 minutes
		var minutes = time.getMinutes();
		minutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();

		return days[time.getDay()] + ' ' +
					 time.getDate().toString() + ' ' + 
					 (months[time.getMonth()]) + ' ' +
					 time.getFullYear().toString() + ' ' + 
					 (time.getHours() - 2).toString() + ':' + 
					 minutes + 'h';
	}.property('model'),

	earnings: function() {
		var amount = this.get('final_balance') - this.get('original_balance');
		//amount = Math.round(amount * 100) / 100
		amount = amount.toFixed(2);
		return amount > 0 ? '+' + amount : amount;
	}.property('model')

});