import Ember from 'ember';

export default Ember.View.extend({

	initializeCalendar: function() {

		//set component
		var self = this;
		
		//initiate and set values for calendar
    Ember.$("#calendar").fullCalendar({

    	height: 300,
    	fixedWeekCount: false,

    	//add logic for each day on calendar
  		dayRender: function(date, cell) {

  			//get start times of services for restaurant
  			var startTimes = self.controller.get('serviceStartTimes');

  			//change start time format to just show days
  			var days = startTimes.map(function(item) {
  				return moment(item).stripZone().stripTime().format();
  			});

  			//get proper format for calendar days
  			var dateFormat = moment(date).stripTime().format();

  			//if there is a service for a calendar day highlight the day
  			//and show highest service discount percent
          if ( days.indexOf(dateFormat) > -1) {

          	//add percent and change background color to yellow
          	cell.html("<a href='#'><p id='calendar-percent'>-10%</p></a>");
          	cell.css('background-color', 'yellow');
      	  }
      	//disable background 
      	if (moment(date).stripTime() < moment().stripTime()) {
      		cell.css('background-color', '#DDD');
      	}
      },

  		//set logic when clicking on day
  		dayClick: function(date) {
  			alert(date.format());
      }
    });

  }.observes("controller.serviceStartTimes").on("didInsertElement")
});
