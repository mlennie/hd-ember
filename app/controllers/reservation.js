import Ember from 'ember';

export default Ember.ObjectController.extend({

	//check if reservations are more than 30 minutes after starting
	reservationHasPassed: function() {
		var date = new Date();
		return this.get('time').getTime() < (date.getTime() - 1800000);
	}.property(),

	//check if status is absent
	absent: function() {
		return this.get('status') === 'absent';
	}.property(),

	//check if status is cancelled
	cancelled: function() {
		return this.get('status') === 'cancelled';
	}.property(),

	//check if status is pending confirmation
	pendingConfirmation: function() {
		return this.get('status') === 'pending_confirmation';
	}.property(),

	validated: function() {
		return this.get('status') == 'pending_confirmation';
	}.property('status'),

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
			if (this.get('amount') === undefined) {
				alert('Please enter an amount.');
			} else {
				var confirmationText = "Are you sure you would like to validate " +
													"the reservation under the name " + 
													this.get('bookingName') +
													" for an amount of " +
													this.get('amount');
				var confirmationResponse = confirm(confirmationText);
				if (confirmationResponse == true) {
					var _this = this;

					var onSuccess = function(reservation) {
					  _this.set('status', 'pending_confirmation');
					  alert('Update successful. Thank you!');
					};

					var onFail = function(reservation) {
					  alert('Sorry could not update reservation. Please Try again soon.');
					};

					this.get('model').save().then(onSuccess, onFail);
				} else {

				}
			}
		}
	}
});
