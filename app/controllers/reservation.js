import Ember from 'ember';

export default Ember.ObjectController.extend({
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
	}.property()
});
