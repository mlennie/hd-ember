import Ember from 'ember';
import CurrentUserMixin from '../../mixins/current-user';

export default Ember.ArrayController.extend({

	days: [1,2,3,4,5,6,7],
	nonValidatedReservations: null,
	day1Reservations: null,
	day2Reservations: null,
	day3Reservations: null,
	day4Reservations: null,
	day5Reservations: null,
	day6Reservations: null,
	day7Reservations: null,
	date1: null,
	date2: null,
	date3: null,
	date4: null,
	date5: null,
	date6: null,
	date7: null,

	setDates: function() {
		for (var i = 0; i < 7; i++) {
			var time = new Date();
			time = (time.getDate() + i).toString() + '/' + 
						 (time.getMonth() + 1).toString() + '/' +
						 time.getFullYear().toString();
			this.set('date' + (i + 1).toString(), time);
		}
	}.observes('model'),

	//computed properties
	SetReservationsForDays: function() {
		var days = this.get('days');
			var reservationsByDay = [];

			for (var i = 0; i < days.length; i++) {
				var day = days[i];
				var extra_days = 86400000 * i;

				//filter reservations for reservations on specific date				
				var reservations = this.get('model').filter(function(reservation) {

					//get hours so can put them back after
					var hours = reservation.get('time').getHours();
					var minutes = reservation.get('time').getMinutes();
					//get day of reservation to compare with date
					var reservation_time = reservation.get('time').setHours(0,0,0,0);
					//reset hours for reservation
					reservation.get('time').setHours(hours);
					//get today's date at midnight
					var today = new Date();
					today.setDate(today.getDate() + i);
					today = today.setHours(0,0,0,0);
					//compare dates to return reservation when dates match
					return reservation_time === today;

				});
				this.set('day' + day.toString() + 'Reservations', reservations);
			}
	}.observes('model')
});