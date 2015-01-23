import Ember from 'ember';

export default Ember.View.extend({

	initializeCalendar: function() {

		//set component
		var self = this;
		console.log(self.controller.get('model.services').getEach('startTime'));
		
		//initiate and set values for calendar
    Ember.$("#calendar").fullCalendar({

    	height: 300,
    	fixedWeekCount: false,

    	//add logic for each day on calendar
  		dayRender: function(date, cell) {

  			//get start times of services for restaurant
  			var startTimes = self.controller.get('model.services').getEach('startTime');

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
  		dayClick: function(date) {
  			alert(date.format());
      }
    });

    //color all background colors for past days disabled
    Ember.$(".fc-past").css({"background-color": "#DDD"});

  }.observes("controller.model").on("didInsertElement")
});
