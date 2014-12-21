import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['name'],
  name: null,
  filteredRestaurants: function() {
    var name = this.get('name');
    var restaurants = this.get('model');

    if (name) {
      return restaurants.filterBy('name', name);
    } 
  }.property('name', 'model'),
  nonFilteredRestaurants: function() {
    var name = this.get('name');
    var restaurants = this.get('model');

    if (name) {
      return restaurants.rejectBy('name', name);
    } else {
      return restaurants;
    }
  }.property('name', 'model')
});
