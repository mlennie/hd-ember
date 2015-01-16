import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['name', 'cuisine'],
  name: null,
  cuisine: null,
  filteredRestaurants: function() {
    var name = this.get('name');
    var cuisine = this.get('cuisine');
    var restaurants = this.get('model');

    //filter by restaurant name
    if (name !== null) {
      if (name === '75017' || name === '75008') {
        restaurants = restaurants.filterBy('zipcode', name);
      } else {
        restaurants = restaurants.filterBy('name', name);
      }
    }

    //filter by restaurant cuisine
    if (cuisine !== null) {
      restaurants = restaurants.filter(function(r) {
        var cuisines = r.get('cuisines');
        cuisines = cuisines.filterBy('name', cuisine );
        return cuisines.length > 0;
      });
    } 
    return restaurants;
  }.property('name', 'model', 'cuisine'),
  nonFilteredRestaurants: function() {

    var controller = this;

    //take filtered restaurants out of resteraunts
    return this.get('model').filter(function(r) {
      var filteredRestaurants = controller.get('filteredRestaurants');
      var names = filteredRestaurants.getEach('name');
      return !(names.indexOf(r.get('name')) > -1);
    });

  }.property('filteredRestaurants'),
  hasFilteredRestaurants: function() {
    return this.get('filteredRestaurants.length') > 0;
  }.property('filteredRestaurants'),
});
