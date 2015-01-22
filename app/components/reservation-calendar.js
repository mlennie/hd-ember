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
				alert(date.format());
    	}
    });

    //alert(new Date().getDate());
    //color all background colors for past days disabled
    Ember.$(".fc-past").css({"background-color": "#DDD"});
    //Ember.$(".fc-future[data-date='2015-01-24'], .fc-today[data-date='2015-01-22']").css({"background-color": "yellow"});
    //Ember.$(".fc-future[data-date='2015-01-24'], .fc-today[data-date='2015-01-22']").text("future");
  }.on("didInsertElement")
});