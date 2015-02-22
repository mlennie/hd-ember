import Ember from 'ember';

export default Ember.Controller.extend({
  //properties
	queryParams: ['name', 'cuisine'],
  name: null,
  cuisine: undefined,
  sortBy: 'street',

  //computed properties

  randomSortBy: function() {
    this.send('changeSortBy');
  }.observes('model', 'name', 'cuisine'),

  shuffledRestaurants: function() {
    return this.get('model').sortBy(this.get('sortBy'));
  }.property('sortBy'),

  filteredRestaurants: function() {
    var name = this.get('name');
    var cuisine = this.get('cuisine');
    var restaurants = this.get('shuffledRestaurants');

    //filter by restaurant name
    if (name !== null) {
      if (name === '75017' || name === '75008' || name === '75016') {
        restaurants = restaurants.filterBy('zipcode', name);
      } else {
        restaurants = restaurants.filterBy('name', name);
      }
    }

    //filter by restaurant cuisine
    if (cuisine !== undefined) {
      restaurants = restaurants.filter(function(r) {
        var cuisines = r.get('cuisines');
        cuisines = cuisines.filterBy('name', cuisine );
        return cuisines.length > 0;
      });
    } 
    return restaurants;
  }.property('sortBy'),

  //get length of filtered restaurants
  filteredRestaurantsLength: function() {
    return this.get('filteredRestaurants.length');
  }.property('filteredRestaurants'),

  nonFilteredRestaurants: function() {
    var controller = this;

    //take filtered restaurants out of resteraunts
    return this.get('shuffledRestaurants').filter(function(r) {
      var filteredRestaurants = controller.get('filteredRestaurants');
      var names = filteredRestaurants.getEach('name');
      return !(names.indexOf(r.get('name')) > -1);
    });

  }.property('filteredRestaurants'),
  hasFilteredRestaurants: function() {
    return this.get('filteredRestaurants.length') > 0;
  }.property('filteredRestaurants'),

  actions: {
    changeSortBy: function() {
      var input = ['name', 'street', 'imgUrl', 'description', 'id'];
       
      for (var i = input.length-1; i >=0; i--) {
       
          var randomIndex = Math.floor(Math.random()*(i+1)); 
          var itemAtIndex = input[randomIndex]; 
           
          input[randomIndex] = input[i]; 
          input[i] = itemAtIndex;
      }
      this.set('sortBy', input.get('firstObject'));
    }
  }
});
