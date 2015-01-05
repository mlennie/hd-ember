import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['name'],
  name: null,
  filteredRestaurants: function() {
    var name = this.get('name');
    var restaurants = this.get('model');

    if (name == '75017' || name == '75008') {
      return restaurants.filterBy('zipcode', name);
    } else {
      return restaurants.filterBy('name', name);
    }
  }.property('name', 'model'),
  nonFilteredRestaurants: function() {
    var name = this.get('name');
    var restaurants = this.get('model');

    if (name == '75017' || name == '75008') {
      return restaurants.rejectBy('zipcode', name);
    } else {
      return restaurants.rejectBy('name', name);
    }
  }.property('name', 'model')
});
