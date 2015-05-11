import Ember from 'ember';

export default Ember.ObjectController.extend({
	//computed properties
	//computed properties
	numberButtons: function() {
		var start = this.get('startTime');
		var end = this.get('lastBookingTime');
		return (moment(end) - moment(start)) / 1000 / 60 / 30;
	}.property(),

	formatedCurrentDiscount: function() {
    return this.get('currentDiscount') * 100;
  }.property(),

	timeArray: function() {
		var numberButtons = this.get('numberButtons');
		var start = this.get('startTime');
		var timeArray = moment(start) > moment() ? [moment(start).format("HH:mm")] : [];
		var i;
		for (i=0; i < numberButtons; ++i) {
			start = moment(start).add(30, 'minutes');
			var startFormatted = moment(start).format("HH:mm");
			if (moment(start) > moment()) {
				timeArray.push(startFormatted);
			}
		}
		return timeArray;
	}.property(),

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
		},
		makeServiceAvailable: function() {
			var confirmationText = "Are you sure you would like to make the service " +
												this.get('startToFinish') + 
												" available again? " +
												"Doing so will allow customers to reserve during these periods again." 
			var confirmationResponse = confirm(confirmationText);
			if (confirmationResponse == true) {
				var _this = this;

				var onSuccess = function() {
				  _this.set('status', 'available');
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