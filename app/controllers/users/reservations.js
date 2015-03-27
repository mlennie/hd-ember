import Ember from 'ember';
import CurrentUserMixin from '../../mixins/current-user';

export default Ember.ArrayController.extend({

	days: [1,2,3,4,5,6,7],
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

				
				var reservations = this.get('model').filter(function(reservation) {
					var time = reservation.get('time');
					var reservation_time = reservation.get('time').setHours(0,0,0,0);
					var today = new Date();
					today.setDate(today.getDate() + i);
					today = today.setHours(0,0,0,0);
					reservation.set('time', time);
					return reservation_time === today;
				});
				this.set('day' + day.toString() + 'Reservations', reservations);
			}
	}.observes('model')
});