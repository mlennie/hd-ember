import Ember from 'ember';
import CurrentUserMixin from '../../mixins/current-user';

export default Ember.Controller.extend({

	days: [1,2,3,4,5,6,7],
	reservationsByDays: [],

	//computed properties
	reservationsByDayArray: function() {
		this.send('dayReservations');
	}.observes('model'),

	actions: {
		dayReservations: function() {
			var days = this.get('days');
			var reservationsByDay = [];

			for (var i = 0; i < days.length; i++) {
				var day = days[i];
				var extra_days = 86400000 * i;

				console.log("---------*****START OF DAY*****--------");
				var reservations = this.get('model').filter(function(reservation) {
					var reservation_time = reservation.get('time').setHours(0,0,0,0);
					var today = new Date();
					today.setDate(today.getDate() + i);
					today = today.setHours(0,0,0,0);
					console.log("START OF FILTER")
					console.log("reservation time: " + reservation.get('time'));
					console.log("reservation time midnight: " + reservation_time);
					console.log("today : " + today);
					console.log([reservation_time, today]);
					console.log(reservation_time === today);
					console.log("END OF FILTER");
					return reservation_time === today;
				});
				reservationsByDay.push([day, reservations]);
				console.log("---------*****END OF DAY*****----------");
			}

			this.set('reservationsByDays', reservationsByDay);
			alert(this.get('reservationsByDays'));
		}
	}
});