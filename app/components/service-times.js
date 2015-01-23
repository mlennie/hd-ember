import Ember from 'ember';

export default Ember.Component.extend({

	//computed properties
	numberButtons: function() {
		var start = this.get('service.startTime');
		var end = this.get('service.lastBookingTime');
		return (moment(end) - moment(start)) / 1000 / 60 / 30;
	}.property('service'),

	timeArray: function() {
		var numberButtons = this.get('numberButtons');
		var start = this.get('service.startTime');
		var timeArray = [moment(start).format("HH:mm")];
		var i;
		for (i=0; i < numberButtons; ++i) {
			start = moment(start).add(30, 'minutes');
			var startFormatted = moment(start).format("HH:mm");
			timeArray.push(startFormatted);
		}
		return timeArray;
	}.property('service')
});
