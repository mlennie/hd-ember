import Ember from 'ember';

export default Ember.ObjectController.extend({
	date: function() {
		var time = this.get('time');
		return time.getDate().toString() + '-' + 
					 (time.getMonth() + 1).toString() + '-' +
					 time.getFullYear().toString();
	}.property(),

	hour: function() {
		var time = this.get('time');
		return time.getHours().toString() + 
					 ':' + 
					 time.getMinutes().toString();
	}.property(),
});
