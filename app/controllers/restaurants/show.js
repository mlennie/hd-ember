import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['date', 'time', 'number'],
  
  //properties
  date: null,
  time: null,
  number: null,
  name: null,
  showReserveButton: true,
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

  //decide whether or not to show time box
  //based on whether date has been chosen or not
  showServices: function() {
    if (this.get('date') !== null) {
      return true;
    } else {
      return false;
    }
  }.property('date'),

  //decide whether or not to show number of people box
  //based on whether time has been chosen or not
  showNbPeople: function() {
    if (this.get('time') !== null) {
      return true;
    } else {
      return false;
    }
  }.property('time'),

  //decide whether or not to show reservation name box
  //based on whether number of people has been chosen or not
  showReservationName: function() {
    if (this.get('number') !== null) {
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

  //array with number of time buttons to show for each service
  filteredServices: function() {
    var date = this.get('date');
    var services = this.get('services');
    return services.filter(function(service) {
      var serviceStartTime = moment(service.get('startTime'));
      var serviceDate = serviceStartTime.stripTime().stripZone().format();
      return date === serviceDate;
    });
  }.property('date'),


  //actions
  actions: {
    showPhoneNumber: function() {
      this.set('showReserveButton', false);
    },

    //after date has been chosen show date query param in url 
    //to trigger next step
    addDateQueryParams: function(date) {
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
        { queryParams: {date: this.get('date')} }
      );
    }
  }
});
