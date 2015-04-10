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
	day1Services: null,
	day2Services: null,
	day3Services: null,
	day4Services: null,
	day5Services: null,
	day6Services: null,
	day7Services: null,
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
			time.setDate(time.getDate()+i)
			time = (time.getDate()).toString() + '/' + 
						 (time.getMonth() + 1).toString() + '/' +
						 time.getFullYear().toString();
			this.set('date' + (i + 1).toString(), time);
		}
	}.observes('model'),

	nonValidatedReservations: function() {
		//filter reservations for reservations that have already started
		//for more than 30 minutes		
		var date = new Date();
		return this.get('model').filter(function(reservation) {
			var time = reservation.get('time');
			var status = reservation.get('status');
			return (time.getTime() < (date.getTime() - 1800000)) &&
						 (status !== 'validated') &&
						 (status !== 'pending_confirmation') &&
						 (status !== 'absent') &&
						 (status !== 'cancelled');
		});

	}.property('model'),

	//computed properties
	setReservationsForDays: function() {
		var days = this.get('days');
			var reservationsByDay = [];

			for (var i = 0; i < days.length; i++) {
				var date = new Date();
				var day = days[i];

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
					//and when reservation is greater than now minus 30 minutes
					//(reservation shows if reservation has not already started 
					//for 30 minutes)
					return reservation_time === today && 
								 reservation.get('time').getTime() > (date.getTime() - 1800000);

				});
				this.set('day' + day.toString() + 'Reservations', reservations);
			}
	}.observes('model'),

	//get restaurant for services
	restaurant: function() {
		return this.get('model.firstObject.restaurant');
	}.property('model'),

	//get services for reservations
	services: function() {
		return this.get('restaurant.services');
	}.property('restaurant'),

	setServicesForDays: function() {
		var days = this.get('days');
			var servicesByDay = [];

			for (var i = 0; i < days.length; i++) {
				var date = new Date();
				var day = days[i];

				//filter services for services on specific date				
				var services = this.get('services').filter(function(service) {
					//get hours so can put them back after
					var hours = service.get('startTime').getHours();
					var minutes = service.get('startTime').getMinutes();
					//get day of service to compare with date
					var service_time = service.get('startTime').setHours(0,0,0,0);
					//reset hours for service
					service.get('startTime').setHours(hours);
					//get today's date at midnight
					var today = new Date();
					today.setDate(today.getDate() + i);
					today = today.setHours(0,0,0,0);
					//compare dates to return service when dates match 
					return service_time === today;

				});
				this.set('day' + day.toString() + 'Services', services);
			}
	}.observes('model')
});







