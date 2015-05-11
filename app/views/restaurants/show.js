import Ember from 'ember';

export default Ember.View.extend({

  reserverPopover: function(){
    //close popovers when click anywhere
    Ember.$('body').on('click', function() {
      Ember.$('*[data-toggle="popover-show"]').popover();
      Ember.$('*[data-toggle="popover-show"]').popover('hide');
    });

    //open popover and close other popovers
    Ember.$('body').on('click', '*[data-toggle="popover-show"]', function(event) {
      event.preventDefault();
      event.stopPropagation();
      Ember.$(this).popover();
      Ember.$(this).popover('show');    
    });
  }.on('didInsertElement'),

  //highlight buttons when selected
  highlightSelectedTime: function() {
    Ember.$(".time-button")
    .css('background-color', '#fff')
    .css('color', '#000');
    Ember.$(".time-button[data-time='" + this.get('controller.time') + "']")
    .css( "background-color", "#5CB85C" )
    .css( "color", "#fff" );
  }.observes("controller.time").on("didInsertElement"),

  //highlight buttons when selected
  highlightSelectedNbCouverts: function() {
    Ember.$(".number-button")
    .css('background-color', '#fff')
    .css('color', '#000');
    Ember.$(".number-button[data-number='" + this.get('controller.number') + "']")
    .css( "background-color", "#5CB85C" )
    .css( "color", "#fff" );
  }.observes("controller.number").on("didInsertElement"),

  //set reservation number to null (which hides name) 
  //when a time button is clicked
  hideNameWhenClickTime: function() {
    var _this = this;
    Ember.$("body").on('click', '.time-button', function() {
      _this.set('controller.number', null);
    });
  }.observes("controller.time").on("didInsertElement"),

  //
  //MAP
  //
  initializeMap: function() {
    var lat = this.get('controller.model.latitude');
    var lng = this.get('controller.model.longitude');

    //add latitude and longitude
    var myLatlng = new google.maps.LatLng(lat, lng);
    
    //add map options
    var mapOptions = {
      zoom: 15,
      center: myLatlng
    };

    //dont show map if restaurant has not been geocoded
    if (lat != null) {
      //create map
      var map = new google.maps.Map(document.getElementById('map'),
          mapOptions);

      //add marker
      var marker = new google.maps.Marker({
          position: myLatlng,
          map: map
      });
    }

  }.on('didInsertElement'),

  //
  //CALENDAR
  //
	initializeCalendar: function() {

		//set component
		var self = this;
		
    Ember.$("#calendar").fullCalendar({

    	height: 350,
    	fixedWeekCount: false,

    	//add logic for each day on calendar
  		dayRender: function(date, cell) {

  			//get start times of services for restaurant
				var startTimes = self.get('controller.serviceStartTimes');

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
          self.set('controller.calendarDate', dateFormat);
          var highestDiscount = self.get('controller.highestDiscount');
          //check to make sure theres still availabilites left
        	if (highestDiscount !== 0) {
            //if date is selected, make green else make yellow
            if (date.format("YYYY-MM-DD") == self.get('controller.date')) {
              cell.addClass('selected');
            }
            //add percent and change background color to yellow
          	cell.html("<p id='calendar-percent'>-" + highestDiscount.toString() + "%</p>");
            cell.addClass('has-services');
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
        var date = date.format("YYYY-MM-DD");
        //reset days to yellow
        Ember.$('.fc-day').removeClass('selected');
        //highlight selected to green
        Ember.$('.fc-day[data-date=' + date + "]").addClass('selected');

				//get start times of services for restaurant
				var startTimes = self.get('controller.serviceStartTimes');

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
          self.set('controller.calendarDate', dateFormat);
          var highestDiscount = self.get('controller.highestDiscount');
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
