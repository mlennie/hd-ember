import Ember from 'ember';

export default Ember.ObjectController.extend({
	//computed properties

	//check if service already has a complete status
	alreadyComplete: function() {
		return this.get('status') === 'complete';
	}.property('status'),

	//format start time
	start: function() {
		var time = this.get('startTime');
		var secondMinuteDigit = time.getMinutes() < 10 ? '0' : '';
		return time.getHours().toString() + 
					 ':' + 
					 time.getMinutes().toString() +
					 secondMinuteDigit;
	}.property(),

	//format end time
	end: function() {
		var time = this.get('lastBookingTime');
		var secondMinuteDigit = time.getMinutes() < 10 ? '0' : '';
		return time.getHours().toString() + 
					 ':' + 
					 time.getMinutes().toString() +
					 secondMinuteDigit;
	}.property(),

	//get start to finish time
	startToFinish: function() {
		return ' ' + this.get('start') + ' à ' + this.get('end');
	}.property(),

	actions: {
		changeServiceToComplete: function() {
			var confirmationText = "Are you sure you would like to make the service " +
												this.get('startToFinish') + 
												" complete? " +
												"Doing so will not allow customers to reserve during these periods." 
			var confirmationResponse = confirm(confirmationText);
			if (confirmationResponse == true) {
				var _this = this;

				var onSuccess = function() {
				  _this.set('status', 'complete');
				  alert('Update successful. Thank you!');
				};

				var onFail = function() {
				  alert('Sorry could not update service. Please Try again soon.');
				};

				this.get('model').save().then(onSuccess, onFail);
			} else {

			}
		}
	}

});