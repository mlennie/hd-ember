import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['date', 'time', 'number'],
  
  //properties
  date: null,
  time: null,
  number: null,
  name: null,
  servicesToList: null,

	//computed properties

  //get services
  services: function() {
    return this.get('model.services');
  }.property('model'),

  //get start times of all services
  serviceStartTimes: function() {
    return this.get('services').getEach('startTime');
  }.property('services'),

  //get background url to use as restaurant image
  backgroundUrl: function() {
    return 'background-image: url(' + this.get('model.imgUrl')+');';
  }.property('model'),



  //array with number of services with given date
  //used to find number of buttons to show for each service
  //and to check whether date matches any services
  filteredServices: function() {
    var date = this.get('date');
    var services = this.get('services');
    if (date !== null && services !== null) {
      return services.filter(function(service) {
        var serviceStartTime = moment(service.get('startTime'));
        var serviceDate = serviceStartTime.stripTime().stripZone().format();
        return date === serviceDate;
      });
    } else {
      return 0;
    }
  }.property('date', 'model'),



  //decide whether or not to show time box
  //based on whether date has been chosen or not
  showServices: function() {
    if (this.get('date') !== null && 
        this.get('filteredServices') !== 0) {
      return true;
    } else {
      return false;
    }
  }.property('date', 'model'),

  //decide whether or not to show number of people box
  //based on whether time has been chosen or not
  showNbPeople: function() {
    if (
      this.get('time') !== null && 
      this.get('date') !== null
    ) {
      return true;
    } else {
      return false;
    }
  }.property('time'),

  //decide whether or not to show reservation name box
  //based on whether number of people has been chosen or not
  showReservationName: function() {
    if (
      this.get('number') !== null && 
      this.get('time') !== null && 
      this.get('date') !== null
    ) {
      return true;
    } else {
      return false;
    }
  }.property('number'),

  //array with number of buttons to show in number of people box
  nbPeopleArray: function() {
    var nbPeople = 9;
    var nbPeopleArray = [];
    var i;
    for (i=0; i < nbPeople; ++i) {
      nbPeopleArray.push(i + 1);
    }
    return nbPeopleArray;
  }.property('time'),

  showNoServiceMessage: function() {
    if (this.get('date') !== null && this.get('filteredServices') === 0) {
      //this.set('showServices', false);
      //this.set('showNbPeople', false);
      //this.set('showReservationName', false);
      return true
    } else if (this.get('date') !== null && this.get('filteredServices') !== 0) {
      return false;
    }
  }.property('date', 'model'),



  /*checkDateForMatchingService: function() {
    //take date, compare services with date and if nothing matches
    //show notice that that date doesn't match but they can view the calendar
    //to choose another date and then hide next three things
    
    //use filteredServices method to get number of services that match date
    if (this.get('date') !== null && this.get('filteredServices') === 0) {
      //this.set('showServices', false);
      //this.set('showNbPeople', false);
      //this.set('showReservationName', false);
      this.set('showNoServiceMessage', true);
    } else if (this.get('date') !== null && this.get('filteredServices') !== 0) {
      this.set('showNoServiceMessage', false);
      this.set('showServices', true);
    }
  }.observes('filteredServices', 'date', 'model'), */


  //actions
  actions: {
    showPhoneNumber: function() {
      this.set('showReserveButton', false);
    },

    //after date has been chosen show date query param in url 
    //to trigger next step
    addDateQueryParams: function(date) {
      //update query params
      this.transitionToRoute(
        'restaurants.show', 
        this.get('model'), 
        { queryParams: {date: date} }
      );
    },

    //final action that will send reservation request 
    //to reservation confirmation page
    goToReservationConfirmationPage: function() {
      this.transitionToRoute(
        'restaurants.reservation-confirmation', 
        this.get('model'), 
        { queryParams: {
            date: this.get('date'), 
            time: this.get('time'), 
            number: this.get('number'),
            name: this.get('name')
          }
        }
      );
    }
  }
});
