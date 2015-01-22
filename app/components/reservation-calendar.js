import Ember from 'ember';

export default Ember.Component.extend({
	initializeCalendar: function() {
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
    Ember.$("#calendar").fullCalendar({
    	height: 300,
    	fixedWeekCount: false,
			dayRender: function(date, cell) {
				var y = date.year();
				var m = date.month();
				var d = date.date();
        if (d === moment().date()) {
        	cell.prepend("<a href='#'></a>");
        	cell.html("<p id='calendar-percent'>-10%</p>");
        	cell.css('background-color', 'yellow');
    		}
			},
			dayClick: function(date, jsEvent, view) {

    	}
    });
    //alert(new Date().getDate());
    //Ember.$(".fc-past").css({"background-color": "#eee"});
    //Ember.$(".fc-future[data-date='2015-01-24'], .fc-today[data-date='2015-01-22']").css({"background-color": "yellow"});
    //Ember.$(".fc-future[data-date='2015-01-24'], .fc-today[data-date='2015-01-22']").text("future");
    Ember.$(".fc-day").css({"border": "solid 1px #999"});
  }.on("didInsertElement")
});

//Sun Dec 28 2014 00:00:00 GMT+0000
//Thu Jan 22 2015 16:58:23 GMT+0100 (CET)