import Ember from 'ember';

export default Ember.Component.extend({

	services: function() {
		var restaurant_id = this.get('restaurant.id');
		alert('worked');
		return this.controller.store.find('service', { restaurant_id: restaurant_id });
	}.on("didInsertElement"),

	initializeCalendar: function() {

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