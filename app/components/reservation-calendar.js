import Ember from 'ember';

export default Ember.Component.extend({
	initializeCalendar: function() {
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
    Ember.$("#calendar").fullCalendar({
    	theme: false,
    		events: [
					{
						title: 'All Day Event',
						start: new Date(y, m, 23),
						allDay: true
					},
					{
						title: 'All Day Event',
						start: new Date(y, m, 24),
						allDay: true
					}
				]
    });
    Ember.$(".fc-past").css({"background-color": "#EEE", "border": "solid 1px #999"});
    Ember.$(".fc-future[data-date='2015-01-24'], .fc-today[data-date='2015-01-22']").css({"background-color": "yellow", "border": "solid 1px #999"});
    Ember.$(".fc-future, .fc-today").css({"border": "solid 1px #999"});
  }.on("didInsertElement")
});
