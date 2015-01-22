import Ember from 'ember';

export default Ember.Component.extend({

	initializeCalendar: function() {
		//set component
		var component = this;
		
		//initiate and set values for calendar
    Ember.$("#calendar").fullCalendar({

    	height: 300,
    	fixedWeekCount: false,

    	//add logic for each day on calendar
			dayRender: function(date, cell) {

				//get start times of services for restaurant
				var startTimes = component.get('services').getEach('startTime');

				//change start time format to just show days
				var days = startTimes.map(function(item) {
					return moment(item).stripZone().stripTime().format();
				});

				//get proper format for calendar days
				var dateFormat = moment(date).stripTime().format();

				//if there is a service for a calendar day highlight the day
				//and show highest service discount percent
        if ( days.indexOf(dateFormat) > -1) {

        	cell.prepend("<a href='#'></a>");
        	cell.html("<p id='calendar-percent'>-10%</p>");
        	cell.css('background-color', 'yellow');
    		}
			},

			//set logic when clicking on day
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