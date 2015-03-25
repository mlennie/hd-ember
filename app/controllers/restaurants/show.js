import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['date', 'time', 'number', 'discount'],
  
  //
  //PROPERTIES
  //
  
  date: null,
  time: null,
  number: null,
  name: null,
  servicesToList: null,
  showNoServiceMessage: false,
  showServices: false,
  showNbPeople: false,
  discount: null,
  showReservationName: false,
  calendarDate: null,

	//
  //COMPUTED PROPERTIES
  //

  //get background url to use as restaurant image
  backgroundUrl: function() {
    return 'background-image: url(' + this.get('model.imgUrl')+');';
  }.property('model'),


  //
  //MENU
  //

  //get first menu for restaurant
  firstMenu: function() {
    return this.get('model.menus').get('firstObject');
  }.property('model'),

  //get menu items for first menu
  menuItems: function() {
    return this.get('firstMenu.menuItems');
  }.property('firstMenu'),

  //get orderve menu items
  orderveMenuItems: function() {
    return this.get('menuItems').filterBy('course', 'Hors_doeuvre');
  }.property('firstMenu'),

  //get entree menu items
  entreeMenuItems: function() {
    return this.get('menuItems').filterBy('course', 'entree');
  }.property('firstMenu'),

  //get principaux menu items
  principauxMenuItems: function() {
    return this.get('menuItems').filterBy('course', 'principaux');
  }.property('firstMenu'),

  //get boisson menu items
  dessertMenuItems: function() {
    return this.get('menuItems').filterBy('course', 'dessert');
  }.property('firstMenu'),

  //get boisson menu items
  boissonMenuItems: function() {
    return this.get('menuItems').filterBy('course', 'boisson');
  }.property('firstMenu'),

  //
  //SERVICES
  //

  //get services
  services: function() {
    return this.get('model.services');
  }.property('model'),

  //get start times of all services
  serviceStartTimes: function() {
    return this.get('services').getEach('startTime');
  }.property('services'),

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
      return [];
    }
  }.property('date', 'model', 'services'),

  //decide whether or not to show reservation boxes
  //based on whether previous boxes have been shown or not
  updateReservationBoxesVisibility: function() {
    if (this.get('date') !== null && 
        this.get('filteredServices.length') !== 0) {
      this.setProperties({
        showServices: true,
        showNbPeople: false,
        showReservationName: false
      });
      if (
        this.get('time') !== null 
      ) {
        this.setProperties({
          showNbPeople: true,
          showReservationName: false
        });
        if (
          this.get('number') !== null 
        ) {
          this.setProperties({
            showReservationName: true
          });
        }
      }
    } else {
      this.setProperties({
        showServices: false,
        showNbPeople: false,
        showReservationName: false
      });
    }
  }.observes('date', 'model', 'time', 'number'),

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

  //update no service message depending on whether date matches any services
  updateServiceMessage: function() {
    //decide whether to show message and services box
    if (this.get('date') !== null &&
        this.get('date') !== "" && 
        this.get('filteredServices.length') === 0) {
          //show message
          this.set('showNoServiceMessage', true);
    } else {
      //reset message back to hidden
      this.set('showNoServiceMessage', false);
    }
  }.observes("model", "date"),

  //get highest discount for day to put on calendar
  highestDiscount: function() {
    var self = this;
    //get services that match dateFormat parameter
    var filteredServices = this.get('services').filter(function(service){
      var serviceDate = moment(service.get('startTime')).stripTime().format();
      return self.get('calendarDate') === serviceDate;
    });

    //get all discounts for services
    var discounts = filteredServices.getEach('currentDiscount');
    
    //get highest discount
    var highestDiscount = 0;
    for (var i = 0; i < discounts.length; i++) { 
      var discount = discounts[i];
      highestDiscount = discount > highestDiscount ? discount : highestDiscount;
    }

    //return highest discount
    return highestDiscount * 100;
  }.property('calendarDate'),

  //actions
  actions: {
    showPhoneNumber: function() {
      this.set('showReserveButton', false);
    },

    //after date has been chosen show date query param in url 
    //to trigger next step
    addDateQueryParams: function(date) {
      this.set('showServices', true);
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
            discount: this.get('discount'),
            time: this.get('time'), 
            number: this.get('number'),
            name: this.get('name')
          }
        }
      );
    },

    clickReserver: function() {
      //MIXPANEL: Add Restaurant Page Reserver Button Click Event
      mixpanel.track('Restaurant Page Réserver Button Click', { 
        'restaurant': this.get('model.name')
      });
    }
  }
});
