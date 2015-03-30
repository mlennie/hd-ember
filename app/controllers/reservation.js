import Ember from 'ember';

export default Ember.ObjectController.extend({

	//check if reservations are more than 30 minutes after starting
	reservationHasPassed: function() {
		var date = new Date();
		return this.get('time').getTime() < (date.getTime() - 1800000);
	}.property(),

	reservationIsForFuture: function() {
		return this.get('reservationHasPassed') == false;
	}.property('reservationHasPassed'),

	date: function() {
		var time = this.get('time');
		return time.getDate().toString() + '/' + 
					 (time.getMonth() + 1).toString() + '/' +
					 time.getFullYear().toString();
	}.property(),

	hour: function() {
		var time = this.get('time');
		var secondMinuteDigit = time.getMinutes() < 10 ? '0' : '';
		return time.getHours().toString() + 
					 ':' + 
					 time.getMinutes().toString() +
					 secondMinuteDigit;
	}.property(),

	actions: {
		validateReservationAmount: function() {
			alert(this.get('amount'));
		}
	}
});
