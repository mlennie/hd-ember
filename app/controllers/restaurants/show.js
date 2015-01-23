import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['date', 'time', 'number'],
  
  //properties
  date: null,
  time: null,
  number: null,
  showReserveButton: true,
  servicesToList: null,

	//computed properties
  services: function() {
    return this.get('model.services');
  }.property('model'),

  serviceStartTimes: function() {
    return this.get('services').getEach('startTime');
  }.property('services'),

  backgroundUrl: function() {
    return 'background-image: url(' + this.get('model.imgUrl')+');';
  }.property('model'),

  showServices: function() {
    if (this.get('date') !== null) {
      return true;
    } else {
      return false;
    }
  }.property('date'),

  showNbPeople: function() {
    if (this.get('time') !== null) {
      return true;
    } else {
      return false;
    }
  }.property('time'),

  nbPeopleArray: function() {
    var nbPeople = 9;
    var nbPeopleArray = [];
    var i;
    for (i=0; i < nbPeople; ++i) {
      nbPeopleArray.push(i + 1);
    }
    return nbPeopleArray;
  }.property('time'),

  filteredServices: function() {
    var date = this.get('date');
    var services = this.get('services');
    return services.filter(function(service) {
      var serviceDate = moment(service.get('startTime')).stripTime().stripZone().format();
      return date === serviceDate;
    });
  }.property('date'),


  //actions
  actions: {
    showPhoneNumber: function() {
      this.set('showReserveButton', false);
    },

    addDateQueryParams: function(date) {
      this.transitionToRoute('restaurants.show', this.get('model'), { queryParams: {date: date} });
    }
  }
});
