import Ember from 'ember';

export default Ember.View.extend({

	initializeCalendar: function() {

		//set component
		var self = this;
		
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
				//initiate and set values for calendar

  			//if there is a service for a calendar day highlight the day
  			//and show highest service discount percent
          if ( days.indexOf(dateFormat) > -1) {

          	//add percent and change background color to yellow
          	cell.html("<p id='calendar-percent'>-10%</p>");
          	cell.css('background-color', 'yellow');
          	cell.css('cursor', 'pointer');
      	  } else if (moment(date).stripTime() < moment().stripTime()) {
      	  	//disable background 
      	  	cell.css('background-color', '#DDD');
	      		cell.prop('disabled', true);
	      		cell.css('cursor', 'not-allowed');
	      	} else {
	      		cell.prop('disabled', true);
	      		cell.css('cursor', 'not-allowed');
	      	}
      },

  		//set logic when clicking on day
  		dayClick: function(date) {

  				//get start times of services for restaurant
					var startTimes = self.controller.get('serviceStartTimes');

					//change start time format to just show days
					var days = startTimes.map(function(item) {
						return moment(item).stripZone().stripTime().format();
					});

					//get proper format for calendar days
					var dateFormat = moment(date).stripTime().format();
					//initiate and set values for calendar

  			if ( days.indexOf(dateFormat) > -1) {
  			
  				alert('picked day');
  			}
      }
    });

  }.observes("controller.serviceStartTimes").on("didInsertElement")
});
