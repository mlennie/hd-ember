import Ember from 'ember';

export default Ember.View.extend({

  jqueryEvents: function(){
    Ember.$('[data-toggle="popover"]').popover().click(function( event ) {
  		event.preventDefault();
  		event.stopPropagation();
  	});
  }.on('didInsertElement'),

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

        //if date is past show as grey and disable
  			if (moment(date).stripTime() < moment().stripTime()) {

          //disable background 
          cell.css('background-color', '#DDD');
          cell.prop('disabled', true);
          cell.css('cursor', 'not-allowed');

          //if there is a service for a calendar day highlight the day
    			//and show highest service discount percent
        } else if ( days.indexOf(dateFormat) > -1 ) {

          //get highest discount from all services for that day 
          //with that have a date equal to dateFormat
          self.controller.set('calendarDate', dateFormat);
          var highestDiscount = self.controller.get('highestDiscount');
          //check to make sure theres still availabilites left
        	if (highestDiscount !== 0) {
            //add percent and change background color to yellow
          	cell.html("<p id='calendar-percent'>-" + highestDiscount.toString() + "%</p>");
          	cell.css('background-color', 'yellow');
          	cell.css('cursor', 'pointer');
          } else {
            cell.prop('disabled', true);
            cell.css('cursor', 'not-allowed');
          }
      	} else { //else disable cell
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

  			//check if day clicked has any services
  			if ( days.indexOf(dateFormat) > -1 ) {
          //get highest discount from all services for that day 
          //with that have a date equal to dateFormat
          self.controller.set('calendarDate', dateFormat);
          var highestDiscount = self.controller.get('highestDiscount');
          //check to make sure theres still availabilites left
          if (highestDiscount !== 0) {

    				//call show services method from controller
    				self.get('controller').send('addDateQueryParams', dateFormat);
          }
  			}
      }
    });

  }.observes("controller.serviceStartTimes").on("didInsertElement")
});
