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

  			//check if day clicked has any services
  			if ( days.indexOf(dateFormat) > -1 ) {

  				//call show services method from controller
  				self.get('controller').send('addDateQueryParams', dateFormat);
  			}
      }
    });

  }.observes("controller.serviceStartTimes").on("didInsertElement")/*,

  updateServiceMessage: function() {
    var self = this;
    Ember.$('body').on('click', '.btn', function() {
      if (this.controller.get('date') !== null && this.controller.get('filteredServices') === 0) {
      this.controller.set('showServices', false);
      this.controller.set('showNbPeople', false);
      this.controller.set('showReservationName', false);
      this.controller.set('showNoServiceMessage', true);
    } else {
      this.controller.set('showNoServiceMessage', false);
    }
    });
  }.on("didInsertElement")*/

  /*checkDateForMatchingService: function() {
    //take date, compare services with date and if nothing matches
    //show notice that that date doesn't match but they can view the calendar
    //to choose another date and then hide next three things
    
    //use filteredServices method to get number of services that match date
    var serviceAmount = this.controller.get('filteredServices');
    if (this.get('date') !== null && serviceAmount === 0) {
      this.controller.set('showServices', false);
      this.controller.set('showNbPeople', false);
      this.controller.set('showReservationName', false);
      this.controller.set('showNoServiceMessage', true);
    } else {
      this.controller.set('showNoServiceMessage', false);
    }
  }.observes('controller.filteredServices', 'controller.model', 
             'controller.date'), */

});
